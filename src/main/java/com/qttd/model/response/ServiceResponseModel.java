package com.qttd.model.response;

import com.qttd.enums.ApiStatus;
import com.qttd.enums.CommonStatus;
import com.qttd.model.request.ImageRequestModel;
import lombok.*;
import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceResponseModel {

    private long serviceId;

    private String serviceName;

    private int index;

    private double unitPrice;

    private int quantity;

    private String description;

    @Enumerated(EnumType.STRING)
    private ApiStatus statusApi;

    @Enumerated(EnumType.STRING)
    private CommonStatus status;

    List<ImageRequestModel> images;
}
