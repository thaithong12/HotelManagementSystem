package com.qttd.model.response;

import com.qttd.entities.ImageEntity;
import com.qttd.entities.OrderEntity;
import com.qttd.enums.ApiStatus;
import com.qttd.model.request.ImageRequestModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ServiceResponseModel {

    private int serviceId;

    private double unitPrice;

    private int quantity;

    private String description;

    @Enumerated(EnumType.STRING)
    private ApiStatus status;

    List<ImageRequestModel> images;
}
