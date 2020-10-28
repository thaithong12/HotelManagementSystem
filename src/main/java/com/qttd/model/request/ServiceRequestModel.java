package com.qttd.model.request;

import com.qttd.entities.ImageEntity;
import com.qttd.enums.ApiStatus;
import com.qttd.enums.CommonStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceRequestModel {
    private int serviceId;

    private int index;

    private String serviceName;

    private double unitPrice;

    private int quantity;

    private String description;

    @Enumerated(EnumType.STRING)
    private CommonStatus status;

    List<ImageRequestModel> imageEntities;
}
