package com.qttd.api;

import com.qttd.model.common.ResponseModel;
import com.qttd.model.request.OrderRequestModel;
import com.qttd.model.response.ListOrderResponseModel;
import com.qttd.model.response.OrderResponseModel;
import com.qttd.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderAPIController {

    @Autowired
    OrderService orderService;

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
    public ResponseEntity<?> addOrUpdateOrders() {
        return ResponseEntity.ok(null);
    }
}
