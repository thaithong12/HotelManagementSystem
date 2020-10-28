package com.qttd.model.response;

import com.qttd.enums.ApiStatus;
import com.qttd.enums.CommonStatus;
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
