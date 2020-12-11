package com.qttd.api;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qttd.entities.OrderEntity;
import com.qttd.entities.RoomEntity;
import com.qttd.model.request.OrderRequestModel;
import com.qttd.repositories.OrderRepository;
import com.paypal.api.payments.Amount;
import com.paypal.api.payments.Details;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.RedirectUrls;
import com.paypal.api.payments.Transaction;
import com.paypal.base.rest.PayPalRESTException;
import com.qttd.service.PaypalService;
import com.qttd.service.RoomService;
import com.qttd.enums.OrderStatus;
import com.qttd.enums.RoomStatus;

import java.awt.Desktop;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
@RestController
@CrossOrigin
@RequestMapping("api/")
public class PaypalAPI {
	@Autowired
	PaypalService payser;
	@Autowired
	RoomService roomser;
	public static final String SUCCESS_URL = "payment-success";
	public static final String CANCEL_URL = "pay/cancel";
	@Autowired
	private OrderRepository orderRepository;

	@GetMapping
	public String home() {
		return "home";
	}

	@PostMapping("pay")
	public String payment(@RequestBody OrderRequestModel order) {
		try {
			Payment payment = payser.createPayment(order.getTotalPrice(), order.getPrePayment(),
					"http://localhost/api/" + CANCEL_URL, "http://localhost/api/" + SUCCESS_URL) ;
			for(Links link:payment.getLinks()) {
				if(link.getRel().equals("approval_url")) {
					return link.getHref();
				}
			}
			
		} catch (PayPalRESTException e) {
		
			e.printStackTrace();
		}
		return "redirect:/";
	}
	
	 @GetMapping(value = CANCEL_URL)
	    public String cancelPay() {
	        return "cancel";
	    }

	    @GetMapping(value = SUCCESS_URL)
	    public boolean successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId, HttpServletResponse response) throws IOException 
         {
	        try {
	            Payment payment = payser.executePayment(paymentId, payerId);
	           
	            System.out.println(payment.toJSON());
	            if (payment.getState().equals("approved")) {
	            	List<OrderEntity> listOrderEntity = (List<OrderEntity>)orderRepository.findAll();
	            	int i = 1;
	            	for (OrderEntity orderEntity : listOrderEntity) {
						if(i == listOrderEntity.size())
						{
							if(orderEntity.getOrderStatus().toString().equals("UNPAID"))
								{  
								   List<Transaction> payTrans= payment.getTransactions();				
			                       for (Transaction transaction : payTrans) {
			                    	   String tmp = transaction.getAmount().getTotal();
									   Double totalPrice = Double.parseDouble(tmp);
									   tmp = transaction.getAmount().getDetails().getSubtotal();
									   Double unitPrice = Double.parseDouble(tmp);
									   if(totalPrice == unitPrice)
									     orderEntity.setOrderStatus(OrderStatus.PAID);
									   if(totalPrice < unitPrice)
										 orderEntity.setOrderStatus(OrderStatus.DEPOSIT);
									   break;
								   }		
								   
								   orderRepository.save(orderEntity);
								   RoomEntity roomEntity = roomser.findById(orderEntity.getRoomEntity().getId());
								   if(orderEntity.getOrderStatus().toString().equals("PAID"))
								     roomEntity.setRoomStatus(RoomStatus.BOOKED);
								   if(orderEntity.getOrderStatus().toString().equals("DEPOSIT"))
									 roomEntity.setRoomStatus(RoomStatus.BOOKING);
								   roomser.saveData(roomEntity);
								}
						}
						i++;
					}
	                response.sendRedirect("http://localhost:3000/payment-success");
	            	
	                return true;
	            }
	        } catch (PayPalRESTException e) {
	         System.out.println(e.getMessage());
	        }
	        return false;
	    }
	    

}
