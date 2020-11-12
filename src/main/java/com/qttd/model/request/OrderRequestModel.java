package com.qttd.model.request;

import com.qttd.enums.Gender;
import com.qttd.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequestModel {
    private Long id;

    private int index;

    private String address;

    private  String country ;

    private String customerName ;

    private String email ;

    private Gender gender;

    private String phoneNumber;

    private Date checkIn ;

    private Date checkOut;

    private OrderStatus status;

    private double totalPrice;

    private double prePayment;

    private String promotionCode;

    private String roomCode;
}
