package com.qttd.api;

import com.qttd.entities.PromotionEntity;
import com.qttd.enums.ApiStatus;
import com.qttd.model.common.ResponseModel;
import com.qttd.model.request.ListPromotionRequestModel;
import com.qttd.model.request.PromotionRequestModel;
import com.qttd.model.response.ListPromotionResponseModel;
import com.qttd.model.response.PromotionResponseModel;
import com.qttd.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
			//PromotionResponseModel promotionResponseModel = new PromotionResponseModel();
			
			List<PromotionResponseModel> listReturn = new ArrayList<PromotionResponseModel>();
			/*for(int i=0; i<listData.size();i ++) {
				PromotionEntity item = listData.get(i);
				//promotionResponseModel.setIndex(i);
				promotionResponseModel.setPromotionId(item.getPromotionId());
				promotionResponseModel.setDiscount(item.getDiscount());
				promotionResponseModel.setDescription(item.getDescription());
				promotionResponseModel.setSDate(item.getSDate());
				promotionResponseModel.setEDate(item.getEDate());
				promotionResponseModel.setCode(item.getCode());
				promotionResponseModel.setImage(item.getImage());
				promotionResponseModel.setStatusApi(ApiStatus.SUCCESS);
				
				listReturn.add(promotionResponseModel);
			};*/
			for(PromotionEntity item : listData) {
				PromotionResponseModel promotionResponseModel = new PromotionResponseModel();
				promotionResponseModel.setPromotionId(item.getId());
				promotionResponseModel.setDiscount(item.getDiscount());
				promotionResponseModel.setDescription(item.getDescription());
				promotionResponseModel.setSDate(item.getSDate());
				promotionResponseModel.setEDate(item.getEDate());
				promotionResponseModel.setCode(item.getCode());
				promotionResponseModel.setImage(item.getImage());
				promotionResponseModel.setStatusApi(ApiStatus.SUCCESS);
				
				listReturn.add(promotionResponseModel);
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
	public ResponseModel<PromotionResponseModel> deletePromotion(@RequestBody PromotionRequestModel promotionModel) {
		ResponseModel<PromotionResponseModel> responseModel = new ResponseModel<>();

		responseModel.setMessage("DELETE ERROR");
		responseModel.setStatus(ApiStatus.ERROR);
		responseModel.setResponse(null);
		List<PromotionEntity> listData = promotionService.getAllPromotion();
		if (!CollectionUtils.isEmpty(listData)) {
				PromotionEntity promotionEntity = listData.stream()
						.filter(item-> item.getId() == promotionModel.getPromotionId())
						.findFirst().orElse(null);
				if (!ObjectUtils.isEmpty(promotionEntity)) {
					promotionService.deleteData(promotionEntity);
					responseModel.setMessage("DELETE SUCCESS");
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
				
				if (validateExist(item.getCode()) == false) {
					 if (item.getPromotionId() == 0) {
						entity = new PromotionEntity();
						SetAttrPromotion(entity, item);
						//entity.setCode(item.getCode());
						promotionService.saveData(entity);
						SetResponseModel(listReturn, i, ApiStatus.SUCCESS);
					} else {
						
						entity = listData.stream().filter(k -> k.getId() == item.getPromotionId())
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
					entity = listData.stream().filter(k -> k.getId() == item.getPromotionId())
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
			}
			ListPromotionResponseModel model = new ListPromotionResponseModel();
			model.setData(listReturn);
			responseModel.setResponse(model);
		}
		return responseModel;
	}
	private void SetResponseModel(List<PromotionResponseModel> listReturn, int i, ApiStatus status) {
        PromotionResponseModel promotionResponseModel = new PromotionResponseModel();
        promotionResponseModel.setIndex(i);
        promotionResponseModel.setStatusApi(status);
        listReturn.add(promotionResponseModel);
    }
	private void SetAttrPromotion(PromotionEntity entity, PromotionRequestModel item) {
		
		entity.setId(item.getPromotionId());
		if(item.getDiscount() != 0.0)
		  entity.setDiscount(item.getDiscount());
		if(item.getDescription() != null)
		  entity.setDescription(item.getDescription());
		if(item.getSDate() != null)
          entity.setSDate(item.getSDate());
		if(item.getEDate() != null)
		  entity.setEDate(item.getEDate());
		if(item.getCode() != null)
		  entity.setCode(item.getCode());
		if(item.getImage() != null)
		  entity.setImage(item.getImage());
		
    }
	
	private boolean validateExist(String code) {
		//int dem = 0;
		PromotionEntity fc = promotionService.findByCode(code);
//		List<PromotionEntity> fde = promotionService.findByDescription(item.getDescription());
//		List<PromotionEntity> fdi = promotionService.findByDiscount(item.getDiscount());
//		List<PromotionEntity> fe = promotionService.findByEDate(item.getEDate());
//		List<PromotionEntity> fs = promotionService.findBySDate(item.getSDate());
//		List<PromotionEntity> fi = promotionService.findByImage(item.getImage());
		if (!ObjectUtils.isEmpty(fc)){
				return true;
		}
//		if (!CollectionUtils.isEmpty(fde) && item.getDescription()!= null){
//			if (fde.size() > 0) dem++;
//		}
//		if (!CollectionUtils.isEmpty(fdi)){
//			if (fdi.size() > 0) dem++;
//		}
//		if (!CollectionUtils.isEmpty(fe) && item.getEDate()!= null){
//			if (fe.size() > 0) dem++;
//		}
//		if (!CollectionUtils.isEmpty(fs) && item.getSDate()!= null){
//			if (fs.size() > 0) dem++;
//		}
//		if (!CollectionUtils.isEmpty(fi) && item.getImage()!= null){
//			if (fi.size() > 0) dem++;
//		}
//		if (dem == 6)
//			return true;
		return  false;
	}
}
