package com.qttd.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qttd.entities.PromotionEntity;
import com.qttd.enums.ApiStatus;
import com.qttd.model.common.ResponseModel;
import com.qttd.model.response.ListCategoryResponseModel;
import com.qttd.model.response.ListPromotionResponseModel;
import com.qttd.model.response.PromotionResponseModel;
import com.qttd.service.CategoryService;

@RestController
@CrossOrigin
@RequestMapping("api/categories")
public class CategoryAPI {
	@Autowired
    CategoryService categoryService;

	//@GetMapping
//	public ResponseModel<ListCategoryResponseModel> getPromotion() {
//		ResponseModel<ListPromotionResponseModel> responseModel = new ResponseModel<>();
//		
//		List<PromotionEntity> listData = promotionService.getAllPromotion();
//		
//		if(!CollectionUtils.isEmpty(listData)) {
//			responseModel.setMessage("GET SUCCESS");
//			responseModel.setStatus(ApiStatus.SUCCESS);
//			ListPromotionResponseModel model = new ListPromotionResponseModel();			
//			List<PromotionResponseModel> listReturn = new ArrayList<PromotionResponseModel>();
//			
//			for(PromotionEntity item : listData) {
//				PromotionResponseModel promotionResponseModel = new PromotionResponseModel();
//				promotionResponseModel.setPromotionId(item.getPromotionId());
//				promotionResponseModel.setDiscount(item.getDiscount());
//				promotionResponseModel.setDescription(item.getDescription());
//				promotionResponseModel.setSDate(item.getSDate());
//				promotionResponseModel.setEDate(item.getEDate());
//				promotionResponseModel.setCode(item.getCode());
//				promotionResponseModel.setImage(item.getImage());
//				promotionResponseModel.setStatusApi(ApiStatus.SUCCESS);
//				
//				listReturn.add(promotionResponseModel);
//			}
//			model.setData(listReturn);
//			responseModel.setResponse(model);
//		} else {
//			responseModel.setMessage("LIST IS NULL");
//			responseModel.setStatus(ApiStatus.ERROR);
//			responseModel.setResponse(null);
//		}
//		return responseModel;
//	}
}
