package com.qttd.service;

import com.qttd.entities.AccountEntity;
import com.qttd.entities.CategoryEntity;
import com.qttd.entities.ConvenientEntity;
import com.qttd.entities.OrderEntity;
import com.qttd.entities.PromotionEntity;
import com.qttd.entities.RoomEntity;
import com.qttd.enums.ApiStatus;
import com.qttd.enums.RoomStatus;
import com.qttd.model.common.ResponseModel;
import com.qttd.model.request.ConvenientRequestModel;
import com.qttd.model.request.ListConvenientRequestModel;
import com.qttd.model.request.ListOrderRequestModel;
import com.qttd.model.request.OrderRequestModel;
import com.qttd.model.response.CategoryResponseModel;
import com.qttd.model.response.ConvenientResponseModel;
import com.qttd.model.response.ListConvenientResponseModel;
import com.qttd.model.response.ListOrderResponseModel;
import com.qttd.model.response.OrderResponseModel;
import com.qttd.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
	RoomService roomService;
    @Autowired
   	PromotionService promotionService;
    @Autowired
	AccountService accountService;
    @Autowired
	CategoryService categoryService;

    public ResponseModel<ListOrderResponseModel> getAllOrders() {
        ResponseModel<ListOrderResponseModel> responseModel = new ResponseModel<>();
        responseModel.setMessage("GET ALL ORDERS");

        ListOrderResponseModel listOrderResponseModel = new ListOrderResponseModel();
        // list data
        List<OrderEntity> listData = (List<OrderEntity>) orderRepository.findAll();
        responseModel.setStatus(ApiStatus.SUCCESS);
        if (CollectionUtils.isEmpty(listData)) {
            listOrderResponseModel.setData(new ArrayList<>());
        } else {
            List<OrderResponseModel> responseModelList = new ArrayList<>();
            for (int i = 0 ; i < listData.size() ; i ++ ) {
                OrderEntity item = listData.get(i);
                OrderResponseModel model = new OrderResponseModel();
                model.setId(item.getId());
                model.setAddress(item.getAddress());
                model.setCheckIn(item.getCheckIn());
                model.setCheckOut(item.getCheckOut());
                model.setCountry(item.getCountry());
                model.setCustomerName(item.getCustomerName());
                model.setRoomCode(item.getRoomEntity().getRoomNumber());
                model.setIndex(i);
                model.setPhoneNumber(item.getPhoneNumber());
                model.setTotalPrice(item.getTotalPrice());
                if(item.getPromotionEntity() != null)
                  model.setPromotionCode(item.getPromotionEntity().getCode());
                model.setStatus(item.getOrderStatus());
                model.setEmail(item.getEmail());
                model.setDeleted(item.isDeleted());
                responseModelList.add(model);
            }
            listOrderResponseModel.setData(responseModelList);
        }
        responseModel.setResponse(listOrderResponseModel);

        return responseModel;
    }

    public ResponseModel<OrderResponseModel> deleteData(OrderRequestModel orderRequestModel) {
        ResponseModel<OrderResponseModel> responseModel = new ResponseModel<>();
        responseModel.setMessage("DELETE ORDER");
        if (!ObjectUtils.isEmpty(orderRequestModel)) {
        	OrderEntity orderEntity = orderRepository.findById(orderRequestModel.getId()).get();
        	orderEntity.setDeleted(true);
        	orderRepository.save(orderEntity);
        	if(orderEntity.getOrderStatus().toString().equals("UNPAID") == false)
        	{  RoomEntity roomEntity = roomService.findById(orderEntity.getRoomEntity().getId());
			   roomEntity.setRoomStatus(RoomStatus.AVAILABLE);
			   roomService.saveData(roomEntity);
		    }
			
            //orderRepository.delete(orderRepository.findById(orderRequestModel.getId()).get());
            responseModel.setStatus(ApiStatus.SUCCESS);
        } else responseModel.setStatus(ApiStatus.ERROR);
        responseModel.setResponse(null);
        return responseModel;
    }
    
    public ResponseModel<ListOrderResponseModel> addOrUpdateOrder(ListOrderRequestModel listRequest) {
		ResponseModel<ListOrderResponseModel> responseModel = new ResponseModel<>();
		responseModel.setMessage("ADD OR UPDATE ORDER");
		responseModel.setStatus(ApiStatus.ERROR);
		responseModel.setResponse(null);

		// get list data from db
		List<OrderEntity> listData = (List<OrderEntity>) orderRepository.findAll();

		// list errors
		List<String> errs = new ArrayList<>();
		// list data need save
		List<OrderEntity> listSave = new ArrayList<>();

		if (CollectionUtils.isEmpty(listData)) listData = new ArrayList<>();
		if(!CollectionUtils.isEmpty(listRequest.getData())) {
			List<OrderResponseModel> listReturn = new ArrayList<>();
			OrderResponseModel orderResponseModel;
			OrderEntity entity;
			for(int i = 0; i < listRequest.getData().size() ; i++ ) {
				OrderRequestModel item = listRequest.getData().get(i);
				if (validateExistMail(item.getEmail()) == true) {
					if (item.getId() == 0) {
						entity = new OrderEntity();
						SetAttrOrder(entity, item);	
						listSave.add(entity);
						responseModel.setStatus(ApiStatus.SUCCESS);
						SetResponseModel(listReturn, i, ApiStatus.SUCCESS);
					} else {
						entity = listData.stream().filter(k -> k.getId() == item.getId())
								.findFirst()
								.orElse(null);
						if (entity != null) {
							SetAttrOrder(entity, item);
							listSave.add(entity);
							responseModel.setStatus(ApiStatus.SUCCESS);
							SetResponseModel(listReturn, i, ApiStatus.SUCCESS);
						} else {
							SetResponseModel(listReturn, i, ApiStatus.ERROR);
							errs.add("Errors " + i);
						}
					}
				} else {
					SetResponseModel(listReturn, i, ApiStatus.ERROR);
					errs.add("Errors " + i);
				}
			}
			if (listSave.isEmpty() || errs.size() > 0) {
				responseModel.setStatus(ApiStatus.ERROR);
			} else {
				orderRepository.saveAll(listSave);
				responseModel.setStatus(ApiStatus.SUCCESS);
			}
			ListOrderResponseModel model = new ListOrderResponseModel();
			model.setData(listReturn);
			responseModel.setResponse(model);
		}
		return responseModel;
	}

    private void SetAttrOrder(OrderEntity entity, OrderRequestModel item) {
    	entity.setId(item.getId());
    	if(item.getAddress() != null)
    	  entity.setAddress(item.getAddress());
    	if(item.getCountry() != null)
    	  entity.setCountry(item.getCountry());
        if(item.getCustomerName() != null)
    	  entity.setCustomerName(item.getCustomerName());
        if(item.getEmail() != null)
          entity.setEmail(item.getEmail());
        if(item.getGender() != null)
          entity.setGender(item.getGender());
        if(item.getPhoneNumber() != null);
          entity.setPhoneNumber(item.getPhoneNumber());
        if(item.getCheckIn() != null)
          entity.setCheckIn(item.getCheckIn());
        if(item.getCheckOut() != null)
          entity.setCheckOut(item.getCheckOut());	
        if(item.getStatus() != null)
          entity.setOrderStatus(item.getStatus());	
        if(item.getTotalPrice() != 0)
          entity.setTotalPrice(item.getTotalPrice());
        if(item.getPrePayment() != 0)
          entity.setUnitPrice(item.getPrePayment());	
        if(item.getEmail() != null)
          if(validateExistMail(item.getEmail()))
        	{
        	   AccountEntity accountEntity = accountService.findByEmail(item.getEmail());
        	   entity.setAccountEntity(accountEntity);
        	}
        if(item.getPromotionCode() != null) {
          PromotionEntity promotionEntity = promotionService.findByCode(item.getPromotionCode());	
          entity.setPromotionEntity(promotionEntity);	
        }
        if(item.getRoomCode() != null) {
        	CategoryEntity categoryEntity = categoryService.findByCategoryName(item.getRoomCode());
            List<RoomEntity> listRoomEntity = roomService.getAllRoom();	
            for (RoomEntity roomEntity : listRoomEntity) {
				if(roomEntity.getCategoryEntity().getId() == categoryEntity.getId())
				{
					if(roomEntity.getRoomStatus().toString().equals("AVAILABLE")) 
					{ entity.setRoomEntity(roomEntity);
					  break;
					}
				}
			}
           	
         }
        entity.setDeleted(false);
		
	}
    private void SetResponseModel(List<OrderResponseModel> listReturn, int i, ApiStatus status) {
        OrderResponseModel orderResponseModel = new OrderResponseModel();
        orderResponseModel.setIndex(i);
        orderResponseModel.setStatusApi(status);
        listReturn.add(orderResponseModel);
    }
	public ResponseModel<ListOrderResponseModel> getAllOrderByAccount(AccountEntity ac) {
        ResponseModel<ListOrderResponseModel> responseModel = new ResponseModel<>();
        responseModel.setMessage("GETT ALL ORDER BY ACCOUNT");
        responseModel.setStatus(ApiStatus.ERROR);
        ListOrderResponseModel model = new ListOrderResponseModel();
        if (!ObjectUtils.isEmpty(ac)) {
            //list data
            List<OrderEntity> orderEntities = (List<OrderEntity>) orderRepository.findAll();
            //list return
            List<OrderResponseModel> listReturn = new ArrayList<>();

            if (!CollectionUtils.isEmpty(orderEntities)){
                OrderResponseModel orderResponseModel;
                for (OrderEntity o : orderEntities) {
                    if ((o.getAccountEntity().getId() == ac.getId()) && !o.isDeleted()) {
                        orderResponseModel = new OrderResponseModel();
                        orderResponseModel.setCategoryRoom(o.getRoomEntity().getCategoryEntity().getCategoryName());
                        orderResponseModel.setId(o.getId());
                        orderResponseModel.setCustomerName(o.getCustomerName());
                        orderResponseModel.setEmail(o.getEmail());
                        orderResponseModel.setStatus(o.getOrderStatus());
                        orderResponseModel.setPromotionCode(ObjectUtils.isEmpty(o.getPromotionEntity()) ? "": o.getPromotionEntity().getCode());
                        orderResponseModel.setTotalPrice(o.getTotalPrice());
                        orderResponseModel.setCheckIn(o.getCheckIn());
                        orderResponseModel.setCheckOut(o.getCheckOut());
                        listReturn.add(orderResponseModel);
                    }
                }
                responseModel.setStatus(ApiStatus.SUCCESS);
                model.setData(listReturn);
            }
        }
        responseModel.setResponse(model);
        return responseModel;
    }
    private boolean validateExistMail(String mail) {
    	String regex = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
        if(mail != null)
    	  if(mail.matches(regex) == false)
            return false;
        return true;
	} 
    public OrderEntity findById(Long id ) {
        return orderRepository.findById(id).get();
    }

    public boolean deleteOrderFromUser(Long id) {
        boolean check = false;
        OrderEntity entity = findById(id);
        if (!ObjectUtils.isEmpty(entity)){
            entity.setDeleted(true);
            orderRepository.save(entity);
            check = true;
        }
        return check;
    }
}
