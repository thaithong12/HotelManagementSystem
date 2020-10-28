package com.qttd.model.request;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ListServiceRequestModel {
    private List<ServiceRequestModel> data;
}
