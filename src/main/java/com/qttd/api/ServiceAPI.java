package com.qttd.api;

import com.qttd.common.ResponseModel;
import com.qttd.entities.ServiceEntity;
import com.qttd.enums.ApiStatus;
import com.qttd.model.request.ImageRequestModel;
import com.qttd.model.request.ServiceRequestModel;
import com.qttd.model.response.ListServiceResponseModel;
import com.qttd.model.response.ServiceResponseModel;
import com.qttd.service.ImageService;
import com.qttd.service.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/service")
public class ServiceAPI {
    @Autowired
    Services services;

    @Autowired
    ImageService imageService;

    @GetMapping
    public ResponseModel<ListServiceResponseModel> getAllServices() {
        ResponseModel<ListServiceResponseModel> responseModel = new ResponseModel<>();

        List<ServiceEntity> listData = services.getAllServices();
        if(!CollectionUtils.isEmpty(listData)) {
            responseModel.setMessage("GET SUCCESS");
            responseModel.setStatus(ApiStatus.SUCCESS);
            ListServiceResponseModel model = new ListServiceResponseModel();
            ServiceResponseModel serviceResponseModel = new ServiceResponseModel();

            List<ServiceResponseModel> listReturn = new ArrayList<ServiceResponseModel>();
            listData.forEach(item -> {
                serviceResponseModel.setServiceId(item.getServiceId());
                serviceResponseModel.setUnitPrice(item.getUnitPrice());
                serviceResponseModel.setDescription(item.getDescription());
                serviceResponseModel.setStatus(item.getStatus());
                if (!CollectionUtils.isEmpty(item.getImageEntities())) {
                    List<ImageRequestModel> listImageReturn = new ArrayList<>();
                    item.getImageEntities().forEach(el -> {
                        ImageRequestModel imgResponse = new ImageRequestModel();
                        imgResponse.setUrl(el.getImageUrl());
                        listImageReturn.add(imgResponse);
                    });
                    serviceResponseModel.setImages(listImageReturn);
                }
                listReturn.add(serviceResponseModel);
            });
            model.setData(listReturn);
            responseModel.setResponse(model);
        } else {
            responseModel.setMessage("LIST IS NULL");
            responseModel.setStatus(ApiStatus.ERROR);
            responseModel.setResponse(null);
        }
        return responseModel;
    }

    @DeleteMapping
    public ResponseModel<ServiceResponseModel> deleteService(@RequestBody ServiceRequestModel requestModel) {
        ResponseModel<ServiceResponseModel> responseModel = new ResponseModel<>();

        responseModel.setMessage("DELETE ERROR");
        responseModel.setStatus(ApiStatus.ERROR);
        responseModel.setResponse(null);
        List<ServiceEntity> listData = services.getAllServices();
        if (!CollectionUtils.isEmpty(listData)) {
            ServiceEntity convenientEntity = listData.stream()
                    .filter(item-> item.getServiceId() == requestModel.getServiceId())
                    .findFirst().orElse(null);
            if (!ObjectUtils.isEmpty(convenientEntity)) {
                services.deleteData(convenientEntity);
                responseModel.setMessage("DELETE SUCESS");
                responseModel.setStatus(ApiStatus.SUCCESS);
            }
        }
        return responseModel;
    }
}
