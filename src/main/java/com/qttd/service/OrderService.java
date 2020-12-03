package com.qttd.service;

import com.qttd.entities.AccountEntity;
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
