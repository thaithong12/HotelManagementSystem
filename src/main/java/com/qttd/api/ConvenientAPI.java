package com.qttd.api;

import java.util.ArrayList;
import java.util.List;

import com.qttd.model.request.ConvenientRequestModel;
import com.qttd.model.request.ListConvenientRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import com.qttd.model.common.ResponseModel;
import com.qttd.entities.ConvenientEntity;
import com.qttd.enums.ApiStatus;
import com.qttd.model.response.ConvenientResponseModel;
import com.qttd.model.response.ListConvenientResponseModel;
import com.qttd.service.ConvenientService;

@RestController
@CrossOrigin
@RequestMapping("/api/conveniences")
public class ConvenientAPI {
	
	@Autowired
	private ConvenientService convenientService;

	@GetMapping
	public ResponseModel<ListConvenientResponseModel> getConvenients() {
		ResponseModel<ListConvenientResponseModel> responseModel = new ResponseModel<>();
		
		List<ConvenientEntity> listData = convenientService.getAllConvenients();
		
		if(!CollectionUtils.isEmpty(listData)) {
			responseModel.setMessage("GET SUCCESS");
			responseModel.setStatus(ApiStatus.SUCCESS);
			
			ListConvenientResponseModel model = new ListConvenientResponseModel();
			
			ConvenientResponseModel convenientResponseModel;
			
			List<ConvenientResponseModel> listReturn = new ArrayList<ConvenientResponseModel>();
			
			for(ConvenientEntity cv : listData) {
				convenientResponseModel = new ConvenientResponseModel();
				
				convenientResponseModel.setConvenientId(cv.getConvenientId());
				convenientResponseModel.setConvenientName(cv.getConvenientName());
				convenientResponseModel.setStatus(ApiStatus.SUCCESS);
				listReturn.add(convenientResponseModel);
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
	public ResponseModel<ConvenientResponseModel> deleteConvenient(@RequestBody ConvenientRequestModel convenientModel) {
		ResponseModel<ConvenientResponseModel> responseModel = new ResponseModel<>();

		responseModel.setMessage("DELETE ERROR");
		responseModel.setStatus(ApiStatus.ERROR);
		responseModel.setResponse(null);
		List<ConvenientEntity> listData = convenientService.getAllConvenients();
		if (!CollectionUtils.isEmpty(listData)) {
				ConvenientEntity convenientEntity = listData.stream()
						.filter(item-> item.getConvenientId() == convenientModel.getConvenientId())
						.findFirst().orElse(null);
				if (!ObjectUtils.isEmpty(convenientEntity)) {
					convenientService.deleteData(convenientEntity);
					responseModel.setMessage("DELETE SUCESS");
					responseModel.setStatus(ApiStatus.SUCCESS);
				}
		}

		return responseModel;
	}

	@PostMapping
	public ResponseModel<ListConvenientResponseModel> addOrUpdateConvenient(@RequestBody ListConvenientRequestModel listRequest) {
		ResponseModel<ListConvenientResponseModel> responseModel = new ResponseModel<>();
		responseModel.setMessage("ADD OR UPDATE CONVENIENT");
		responseModel.setStatus(ApiStatus.ERROR);
		responseModel.setResponse(null);
		List<ConvenientEntity> listData = convenientService.getAllConvenients();
		if (CollectionUtils.isEmpty(listData)) listData = new ArrayList<>();
		if(!CollectionUtils.isEmpty(listRequest.getData())) {
			List<ConvenientResponseModel> listReturn = new ArrayList<>();
			ConvenientResponseModel convenientResponseModel;
			ConvenientEntity entity;
			for(int i = 0; i < listRequest.getData().size() ; i++ ) {
				ConvenientRequestModel item = listRequest.getData().get(i);
				if (validateExistName(item.getConvenientName()) == false) {
					if (item.getConvenientId() == 0) {
						entity = new ConvenientEntity();
						entity.setConvenientName(item.getConvenientName());
						convenientService.saveData(entity);

						SetResponseModel(listReturn, i, ApiStatus.SUCCESS);
					} else {
						entity = listData.stream().filter(k -> k.getConvenientId() == item.getConvenientId())
								.findFirst()
								.orElse(null);
						if (entity != null) {
							entity.setConvenientName(item.getConvenientName());
							convenientService.saveData(entity);

							SetResponseModel(listReturn, i, ApiStatus.SUCCESS);
						} else {
							SetResponseModel(listReturn, i, ApiStatus.ERROR);
						}
					}
				} else {
					SetResponseModel(listReturn, i, ApiStatus.ERROR);
				}
			}
			ListConvenientResponseModel model = new ListConvenientResponseModel();
			model.setData(listReturn);
			responseModel.setResponse(model);
		}
		return responseModel;
	}

	private void SetResponseModel(List<ConvenientResponseModel> listReturn, int i, ApiStatus status) {
		ConvenientResponseModel convenientResponseModel;
		convenientResponseModel = new ConvenientResponseModel();
		convenientResponseModel.setIndex(i);
		convenientResponseModel.setStatus(status);
		listReturn.add(convenientResponseModel);
	}

	private boolean validateExistName(String name ) {
		List<ConvenientEntity> datas = convenientService.findByName(name);
		if (!CollectionUtils.isEmpty(datas)){
			if (datas.size() > 0) {
				return  true;
			}
		}
		return  false;
	}
}
