package com.qttd.api;

import com.qttd.config.JwtUtil;
import com.qttd.model.common.AccountPrincipal;
import com.qttd.model.common.ResponseModel;
import com.qttd.model.request.ListOrderRequestModel;
import com.qttd.model.request.OrderRequestModel;
import com.qttd.model.response.ListOrderResponseModel;
import com.qttd.model.response.OrderResponseModel;
import com.qttd.service.AccountService;
import com.qttd.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/orders")
public class OrderAPIController {

    @Autowired
    OrderService orderService;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    AccountService accountService;

    @GetMapping
    public ResponseEntity<?> getAllOrders() {
        ResponseModel<ListOrderResponseModel> responseModel = orderService.getAllOrders();
        return ResponseEntity.ok(responseModel);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteOrder(@RequestBody OrderRequestModel requestModel) {
        ResponseModel<OrderResponseModel> responseModel = orderService.deleteData(requestModel);
        return ResponseEntity.ok(responseModel);
    }

    @PostMapping
    public ResponseEntity<?> addOrUpdateOrders(@RequestBody ListOrderRequestModel listRequest) {
        ResponseModel<ListOrderResponseModel> responseModel = orderService.addOrUpdateOrder(listRequest);

        return ResponseEntity.ok(responseModel);
    }

    @PostMapping("/order-details")
    public ResponseEntity<?> getAllOrderByAccount(@RequestBody String token) {
        ResponseModel<ListOrderResponseModel> responseModel = null;
        try {
            AccountPrincipal accountPrincipal = jwtUtil.getUserFromToken(token);

            if (!ObjectUtils.isEmpty(accountPrincipal)) {

                responseModel = orderService.getAllOrderByAccount(accountService.findOne(accountPrincipal.getUserId()).get());
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return ResponseEntity.ok(responseModel);
    }

    @DeleteMapping("/order-details")
    public ResponseEntity<?> deleteOrderFromUser(@RequestBody OrderRequestModel model) {
        boolean check = false;
        if (!StringUtils.isEmpty(model.getId())) {
            check = orderService.deleteOrderFromUser(model.getId());
        }
        return ResponseEntity.ok(check);
    }
}
