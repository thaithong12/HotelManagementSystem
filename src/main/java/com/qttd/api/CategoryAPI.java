package com.qttd.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qttd.entities.CategoryEntity;
import com.qttd.entities.PromotionEntity;
import com.qttd.enums.ApiStatus;
import com.qttd.model.common.ResponseModel;
import com.qttd.model.request.ImageRequestModel;
import com.qttd.model.response.CategoryResponseModel;
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

	@GetMapping
	public ResponseModel<ListCategoryResponseModel> getCategory() {
		ResponseModel<ListCategoryResponseModel> responseModel = new ResponseModel<>();
		
		List<CategoryEntity> listData = categoryService.getAllCategory();
		
		if(!CollectionUtils.isEmpty(listData)) {
			responseModel.setMessage("GET SUCCESS");
			responseModel.setStatus(ApiStatus.SUCCESS);
			ListCategoryResponseModel model = new ListCategoryResponseModel();			
			List<CategoryResponseModel> listReturn = new ArrayList<CategoryResponseModel>();
			
			for(CategoryEntity item : listData) {
				CategoryResponseModel categoryResponseModel = new CategoryResponseModel();
				categoryResponseModel.setCategoryId(item.getId());
				categoryResponseModel.setCategoryName(item.getCategoryName());
				categoryResponseModel.setDescription(item.getDescription());
				categoryResponseModel.setPrice(item.getPrice());
				categoryResponseModel.setMaximumPeopleOfRoom(item.getMaximumPeopleOfRoom());
				categoryResponseModel.setNumberOfRoom(item.getNumberOfRoom());
				if (!CollectionUtils.isEmpty(item.getImageEntities())) {
                    List<ImageRequestModel> listImageReturn = new ArrayList<>();
                    item.getImageEntities().forEach(el -> {
                        ImageRequestModel imgResponse = new ImageRequestModel();
                        imgResponse.setUrl(el.getImageUrl());
                        listImageReturn.add(imgResponse);
                    });
                    categoryResponseModel.setImages(listImageReturn);
                }
				categoryResponseModel.setStatusApi(ApiStatus.SUCCESS);
				
				listReturn.add(categoryResponseModel);
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
}
