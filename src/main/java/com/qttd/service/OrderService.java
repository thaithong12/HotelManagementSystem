package com.qttd.service;

import com.qttd.entities.OrderEntity;
import com.qttd.enums.ApiStatus;
import com.qttd.model.common.ResponseModel;
import com.qttd.model.request.OrderRequestModel;
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
                model.setPromotionCode(item.getPromotionEntity().getCode());
                model.setStatus(item.getOrderStatus());
                model.setEmail(item.getEmail());
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
            orderRepository.delete(orderRepository.findById(orderRequestModel.getId()).get());
            responseModel.setStatus(ApiStatus.SUCCESS);
        } else responseModel.setStatus(ApiStatus.ERROR);
        responseModel.setResponse(null);
        return responseModel;
    }
}
