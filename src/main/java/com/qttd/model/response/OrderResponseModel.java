package com.qttd.model.response;

import com.qttd.enums.ApiStatus;
import com.qttd.enums.Gender;
import com.qttd.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseModel {
    private Long id;

    private int index;

    private String categoryRoom;

    private String address;

    private  String country ;

    private String customerName ;

    private String email ;

    private Gender gender;

    private String phoneNumber;

    private Date checkIn ;

    private Date checkOut;
    private ApiStatus statusApi;

    private OrderStatus status;

    private double totalPrice;

    private double prePayment;

    private String promotionCode;

    private String roomCode;
    private boolean isDeleted;
}
