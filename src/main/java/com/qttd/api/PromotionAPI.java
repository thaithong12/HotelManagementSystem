package com.qttd.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qttd.entities.PromotionEntity;
import com.qttd.enums.ApiStatus;
import com.qttd.model.common.ResponseModel;
import com.qttd.model.request.ListPromotionRequestModel;
import com.qttd.model.request.PromotionRequestModel;
import com.qttd.model.response.ListPromotionResponseModel;
import com.qttd.model.response.PromotionResponseModel;
import com.qttd.service.PromotionService;

@RestController
@CrossOrigin
@RequestMapping("/api/promotion")
public class PromotionAPI {
	@Autowired
    PromotionService promotionService;
	
	@GetMapping
	public ResponseModel<ListPromotionResponseModel> getPromotion() {
		ResponseModel<ListPromotionResponseModel> responseModel = new ResponseModel<>();
		
		List<PromotionEntity> listData = promotionService.getAllPromotion();
		
		if(!CollectionUtils.isEmpty(listData)) {
			responseModel.setMessage("GET SUCCESS");
			responseModel.setStatus(ApiStatus.SUCCESS);
			ListPromotionResponseModel model = new ListPromotionResponseModel();
			PromotionResponseModel promotionResponseModel = new PromotionResponseModel();
			
			List<PromotionResponseModel> listReturn = new ArrayList<PromotionResponseModel>();
			listData.forEach(item -> {
				promotionResponseModel.setPromotionId(item.getPromotionId());
				promotionResponseModel.setDiscount(item.getDiscount());
				promotionResponseModel.setDescription(item.getDescription());
				promotionResponseModel.setSDate(item.getSDate());
				promotionResponseModel.setEDate(item.getEDate());
				promotionResponseModel.setCode(item.getCode());
				promotionResponseModel.setImage(item.getImage());
				promotionResponseModel.setStatusApi(ApiStatus.SUCCESS);
				
				listReturn.add(promotionResponseModel);
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
	public ResponseModel<PromotionResponseModel> deletePromotion(@RequestBody PromotionRequestModel promotionModel) {
		ResponseModel<PromotionResponseModel> responseModel = new ResponseModel<>();

		responseModel.setMessage("DELETE ERROR");
		responseModel.setStatus(ApiStatus.ERROR);
		responseModel.setResponse(null);
		List<PromotionEntity> listData = promotionService.getAllPromotion();
		if (!CollectionUtils.isEmpty(listData)) {
				PromotionEntity promotionEntity = listData.stream()
						.filter(item-> item.getPromotionId() == promotionModel.getPromotionId())
						.findFirst().orElse(null);
				if (!ObjectUtils.isEmpty(promotionEntity)) {
					promotionService.deleteData(promotionEntity);
					responseModel.setMessage("DELETE SUCESS");
					responseModel.setStatus(ApiStatus.SUCCESS);
				}
		}

		return responseModel;
	}
	@PostMapping
	public ResponseModel<ListPromotionResponseModel> addOrUpdatePromotion(@RequestBody ListPromotionRequestModel listRequest) {
		ResponseModel<ListPromotionResponseModel> responseModel = new ResponseModel<>();
		responseModel.setMessage("ADD OR UPDATE PROMOTION");
		responseModel.setStatus(ApiStatus.ERROR);
		responseModel.setResponse(null);
		List<PromotionEntity> listData = promotionService.getAllPromotion();
		if (CollectionUtils.isEmpty(listData)) listData = new ArrayList<>();
		if(!CollectionUtils.isEmpty(listRequest.getData())) {
			List<PromotionResponseModel> listReturn = new ArrayList<>();
			//PromotionResponseModel promotionResponseModel;
			PromotionEntity entity;
			for(int i = 0; i < listRequest.getData().size() ; i++ ) {
				PromotionRequestModel item = listRequest.getData().get(i);
				if (validateExistName(item.getCode()) == false) {
					if (item.getPromotionId() == 0) {
						entity = new PromotionEntity();
						SetAttrPromotion(entity, item);
						//entity.setCode(item.getCode());
						promotionService.saveData(entity);

						SetResponseModel(listReturn, i, ApiStatus.SUCCESS);
					} else {
						entity = listData.stream().filter(k -> k.getPromotionId() == item.getPromotionId())
								.findFirst()
								.orElse(null);
						if (entity != null) {
							SetAttrPromotion(entity, item);
							promotionService.saveData(entity);
							SetResponseModel(listReturn, i, ApiStatus.SUCCESS);
						} else {
							SetResponseModel(listReturn, i, ApiStatus.ERROR);
						}
					}
				} else {
					SetResponseModel(listReturn, i, ApiStatus.ERROR);
				}
			}
			ListPromotionResponseModel model = new ListPromotionResponseModel();
			model.setData(listReturn);
			responseModel.setResponse(model);
		}
		return responseModel;
	}
	private void SetResponseModel(List<PromotionResponseModel> listReturn, int i, ApiStatus status) {
        PromotionResponseModel promotionResponseModel;
        promotionResponseModel = new PromotionResponseModel();
        promotionResponseModel.setIndex(i);
        promotionResponseModel.setStatusApi(status);
        listReturn.add(promotionResponseModel);
    }
	private void SetAttrPromotion(PromotionEntity entity, PromotionRequestModel item) {
		
		entity.setDiscount(item.getDiscount());
		entity.setDescription(item.getDescription());
		entity.setSDate(item.getSDate());
		entity.setEDate(item.getEDate());
		entity.setCode(item.getCode());
		entity.setImage(item.getImage());
		
    }
	
	private boolean validateExistName(String code ) {
		List<PromotionEntity> datas = promotionService.findByCode(code);
		if (!CollectionUtils.isEmpty(datas)){
			if (datas.size() > 0) {
				return  true;
			}
		}
		return  false;
	}
}
