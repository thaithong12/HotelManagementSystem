package com.qttd.api;

import com.qttd.entities.ImageEntity;
import com.qttd.entities.ServiceEntity;
import com.qttd.enums.ApiStatus;
import com.qttd.model.common.ResponseModel;
import com.qttd.model.request.ImageRequestModel;
import com.qttd.model.request.ListServiceRequestModel;
import com.qttd.model.request.ServiceRequestModel;
import com.qttd.model.response.ListServiceResponseModel;
import com.qttd.model.response.ServiceResponseModel;
import com.qttd.service.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/services")
public class ServiceAPIController {
    @Autowired
    Services services;

    @GetMapping
    public ResponseModel<ListServiceResponseModel> getAllServices() {
        ResponseModel<ListServiceResponseModel> responseModel = new ResponseModel<>();

        List<ServiceEntity> listData = services.getAllServices();
        
        if(!CollectionUtils.isEmpty(listData)) {
        	
            responseModel.setMessage("GET SUCCESS");
            responseModel.setStatus(ApiStatus.SUCCESS);
            
            ListServiceResponseModel model = new ListServiceResponseModel();
            
            ServiceResponseModel serviceResponseModel;

            List<ServiceResponseModel> listReturn = new ArrayList<ServiceResponseModel>();
            
            for(ServiceEntity item : listData) {
            	serviceResponseModel = new ServiceResponseModel();
            	
            	serviceResponseModel.setServiceId((item.getId()));
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
            }
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
                    .filter(item-> item.getId() == requestModel.getServiceId())
                    .findFirst().orElse(null);
            if (!ObjectUtils.isEmpty(convenientEntity)) {
                services.deleteData(convenientEntity);
                responseModel.setMessage("DELETE SUCESS");
                responseModel.setStatus(ApiStatus.SUCCESS);
            }
        }
        return responseModel;
    }

    @PostMapping
    public ResponseModel<ListServiceResponseModel> addOrUpdateService(@RequestBody ListServiceRequestModel listRequest) {
        ResponseModel<ListServiceResponseModel> responseModel = new ResponseModel<>();

        responseModel.setMessage("ADD OR UPDATE SERVICES");
        responseModel.setStatus(ApiStatus.ERROR);
        responseModel.setResponse(null);

        List<ServiceEntity> listData = services.getAllServices();
        if (CollectionUtils.isEmpty(listData)) listData = new ArrayList<>();
        if(!CollectionUtils.isEmpty(listRequest.getData())) {
            List<ServiceResponseModel> listReturn = new ArrayList<>();
            ServiceResponseModel serviceResponseModel;
            ServiceEntity entity;
            for(int i = 0; i < listRequest.getData().size() ; i++ ) {
                ServiceRequestModel item = listRequest.getData().get(i);
                if (validateExistName(item.getServiceName()) == false) {
                    if (item.getServiceId() == 0) {
                        entity = new ServiceEntity();
                        SetAttrService(entity, item);

                        services.saveData(entity);

                        SetResponseModel(listReturn, i, item, ApiStatus.SUCCESS);
                    } else {
                        entity = listData.stream()
                                .filter(k -> k.getId() == item.getServiceId())
                                .findFirst()
                                .orElse(null);
                        if (entity != null) {
                            SetAttrService(entity, item);
                            services.saveData(entity);
                            SetResponseModel(listReturn, i, item, ApiStatus.SUCCESS);
                        } else {
                            serviceResponseModel = new ServiceResponseModel();
                            serviceResponseModel.setIndex(i);
                            serviceResponseModel.setStatusApi(ApiStatus.ERROR);
                            listReturn.add(serviceResponseModel);
                        }
                    }
                } else {
                	entity = listData.stream()
                            .filter(k -> k.getId() == item.getServiceId())
                            .findFirst()
                            .orElse(null);
                    if (entity != null) {
                        SetAttrService(entity, item);
                        services.saveData(entity);
                        SetResponseModel(listReturn, i, item, ApiStatus.SUCCESS);
                    } else {
                        serviceResponseModel = new ServiceResponseModel();
                        serviceResponseModel.setIndex(i);
                        serviceResponseModel.setStatusApi(ApiStatus.ERROR);
                        listReturn.add(serviceResponseModel);
                    }
                }
            }
            ListServiceResponseModel model = new ListServiceResponseModel();
            model.setData(listReturn);
            responseModel.setResponse(model);
        }
        return responseModel;
    }

    private void SetResponseModel(List<ServiceResponseModel> listReturn, int i, ServiceRequestModel item, ApiStatus status) {
        ServiceResponseModel serviceResponseModel;
        serviceResponseModel = new ServiceResponseModel();
        serviceResponseModel.setIndex(i);
        serviceResponseModel.setStatusApi(status);
        serviceResponseModel.setStatus(item.getStatus());
        listReturn.add(serviceResponseModel);
    }

    private void SetAttrService(ServiceEntity entity, ServiceRequestModel item) {
        entity.setServiceName(item.getServiceName());
        entity.setDescription(item.getDescription());
        entity.setQuantity(item.getQuantity());
        entity.setStatus(item.getStatus());
        entity.setUnitPrice(item.getUnitPrice());
        if (!CollectionUtils.isEmpty(item.getImageEntities())) {
            List<ImageEntity> listImages;
            if (CollectionUtils.isEmpty(entity.getImageEntities())){
                listImages = new ArrayList<>();
            } else {
                listImages = entity.getImageEntities();
            }
            item.getImageEntities().forEach(img -> {
                ImageEntity imageEntity = new ImageEntity();
                imageEntity.setImageUrl(img.getUrl());

                listImages.add(imageEntity);
            });
            entity.setImageEntities(listImages);
        }
    }

    private boolean validateExistName(String name ) {
        List<ServiceEntity> datas = services.findByNameService(name);
        if (!CollectionUtils.isEmpty(datas)){
            if (datas.size() > 0) {
                return  true;
            }
        }
        return  false;
    }
}
