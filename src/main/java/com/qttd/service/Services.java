package com.qttd.service;

import com.qttd.entities.ImageEntity;
import com.qttd.entities.ServiceEntity;
import com.qttd.enums.ApiStatus;
import com.qttd.model.common.ResponseModel;
import com.qttd.model.request.ImageRequestModel;
import com.qttd.model.request.ListServiceRequestModel;
import com.qttd.model.request.ServiceRequestModel;
import com.qttd.model.response.ListServiceResponseModel;
import com.qttd.model.response.ServiceResponseModel;
import com.qttd.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;

@Service
public class Services {

    @Autowired
    private ServiceRepository serviceRepository;

    public ResponseModel<ListServiceResponseModel> getAllService() {
        ResponseModel<ListServiceResponseModel> responseModel = new ResponseModel<>();

        List<ServiceEntity> listData = (List<ServiceEntity>) serviceRepository.findAll();

        responseModel.setMessage("GET SERVICES");

        if(!CollectionUtils.isEmpty(listData)) {

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
                        imgResponse.setId(el.getId());
                        listImageReturn.add(imgResponse);
                    });
                    serviceResponseModel.setImages(listImageReturn);
                }
                serviceResponseModel.setQuantity(item.getQuantity());
                serviceResponseModel.setServiceName(item.getServiceName());
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

    public ResponseModel<ServiceResponseModel> deleteData(ServiceRequestModel requestModel) {
        ResponseModel<ServiceResponseModel> responseModel = new ResponseModel<>();

        responseModel.setMessage("DELETE ERROR");
        responseModel.setStatus(ApiStatus.ERROR);
        responseModel.setResponse(null);
        List<ServiceEntity> listData = (List<ServiceEntity>) serviceRepository.findAll();
        if (!CollectionUtils.isEmpty(listData)) {
            ServiceEntity convenientEntity = listData.stream()
                    .filter(item-> item.getId() == requestModel.getServiceId())
                    .findFirst().orElse(null);
            if (!ObjectUtils.isEmpty(convenientEntity)) {
                serviceRepository.delete(convenientEntity);
                responseModel.setMessage("DELETE SUCESS");
                responseModel.setStatus(ApiStatus.SUCCESS);
            }
        }
        return responseModel;
    }

    public ResponseModel<ListServiceResponseModel> addOrUpdateServices(ListServiceRequestModel listRequest) {
        ResponseModel<ListServiceResponseModel> responseModel = new ResponseModel<>();

        responseModel.setMessage("ADD OR UPDATE SERVICES");
        responseModel.setStatus(ApiStatus.ERROR);
        responseModel.setResponse(null);
        // list save data
        List<ServiceEntity> listSave = new ArrayList<>();
        // list Error
        List<String> errs = new ArrayList<>();

        List<ServiceEntity> listData = (List<ServiceEntity>) serviceRepository.findAll();
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

                        listSave.add(entity);
                        SetResponseModel(listReturn, i, item, ApiStatus.SUCCESS);
                    } else {
                        entity = listData.stream()
                                .filter(k -> k.getId() == item.getServiceId())
                                .findFirst()
                                .orElse(null);
                        if (entity != null) {
                            SetAttrService(entity, item);
                            listSave.add(entity);
                            SetResponseModel(listReturn, i, item, ApiStatus.SUCCESS);
                        } else {
                            serviceResponseModel = new ServiceResponseModel();
                            serviceResponseModel.setIndex(i);
                            errs.add("Errors " + i);
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
                        listSave.add(entity);
                        SetResponseModel(listReturn, i, item, ApiStatus.SUCCESS);
                    } else {
                        serviceResponseModel = new ServiceResponseModel();
                        serviceResponseModel.setIndex(i);
                        errs.add("Errors " + i);
                        serviceResponseModel.setStatusApi(ApiStatus.ERROR);
                        listReturn.add(serviceResponseModel);
                    }
                }
            }
            if (listSave.isEmpty() || !errs.isEmpty()) {
                responseModel.setStatus(ApiStatus.ERROR);
                errs.add("Errors ");
            } else {
                serviceRepository.saveAll(listSave);
                responseModel.setStatus(ApiStatus.SUCCESS);
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
                imageEntity.setServiceEntity(entity);
                listImages.add(imageEntity);
            });
            entity.setImageEntities(listImages);
        }
    }

    private boolean validateExistName(String name ) {
        List<ServiceEntity> datas = serviceRepository.findByServiceName(name);
        if (!CollectionUtils.isEmpty(datas)){
            if (datas.size() > 0) {
                return  true;
            }
        }
        return  false;
    }
}
