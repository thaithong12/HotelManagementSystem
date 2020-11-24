package com.qttd.api;

import com.qttd.model.common.ResponseModel;
import com.qttd.model.request.ListServiceRequestModel;
import com.qttd.model.request.ServiceRequestModel;
import com.qttd.model.response.ListServiceResponseModel;
import com.qttd.model.response.ServiceResponseModel;
import com.qttd.service.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/services")
public class ServiceAPIController {
    @Autowired
    Services services;

    @GetMapping
    public ResponseEntity<?> getAllServices() {
        ResponseModel<ListServiceResponseModel> responseModel = services.getAllService();
        return ResponseEntity.ok(responseModel);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteService(@RequestBody ServiceRequestModel requestModel) {
        ResponseModel<ServiceResponseModel> responseModel = services.deleteData(requestModel);
        return ResponseEntity.ok(responseModel);
    }

    @PostMapping
    public ResponseEntity<?> addOrUpdateService(@RequestBody ListServiceRequestModel listRequest) {
        ResponseModel<ListServiceResponseModel> responseModel = services.addOrUpdateServices(listRequest);
        return ResponseEntity.ok(responseModel);
    }
}
