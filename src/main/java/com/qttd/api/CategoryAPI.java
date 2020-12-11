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

import com.qttd.entities.CategoryEntity;
import com.qttd.entities.ConvenientEntity;
import com.qttd.entities.ImageEntity;
import com.qttd.entities.PromotionEntity;
import com.qttd.entities.ServiceEntity;
import com.qttd.enums.ApiStatus;
import com.qttd.model.common.ResponseModel;
import com.qttd.model.request.CategoryRequestModel;
import com.qttd.model.request.ConvenientRequestModel;
import com.qttd.model.request.ImageRequestModel;
import com.qttd.model.request.ListCategoryRequestModel;
import com.qttd.model.request.ListPromotionRequestModel;
import com.qttd.model.request.PromotionRequestModel;
import com.qttd.model.request.ServiceRequestModel;
import com.qttd.model.response.CategoryResponseModel;
import com.qttd.model.response.ListCategoryResponseModel;
import com.qttd.model.response.ListPromotionResponseModel;
import com.qttd.model.response.PromotionResponseModel;
import com.qttd.model.response.ServiceResponseModel;
import com.qttd.repositories.ConvenientRepository;
import com.qttd.service.CategoryService;
import com.qttd.service.ConvenientService;

@RestController
@CrossOrigin
@RequestMapping("api/categories")
public class CategoryAPI {
	@Autowired
    CategoryService categoryService;
	@Autowired
	ConvenientService convenientService;
	
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
                        imgResponse.setId(el.getId());
                        listImageReturn.add(imgResponse);
                    });
                    categoryResponseModel.setImages(listImageReturn);
                }
				if (!CollectionUtils.isEmpty(item.getConvenientEntities())) {
                    List<ConvenientRequestModel> listConvenientReturn = new ArrayList<>();
                    item.getConvenientEntities().forEach(el -> {
                        ConvenientRequestModel cvResponse = new ConvenientRequestModel();
                        cvResponse.setConvenientId(el.getId());
                        cvResponse.setConvenientName(el.getConvenientName());
                        listConvenientReturn.add(cvResponse);
                    });
                    categoryResponseModel.setConvenientEntities(listConvenientReturn);
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
	@DeleteMapping
	public ResponseModel<CategoryResponseModel> deleteCategory(@RequestBody CategoryRequestModel categoryModel) {
		ResponseModel<CategoryResponseModel> responseModel = new ResponseModel<>();

		responseModel.setMessage("DELETE ERROR");
		responseModel.setStatus(ApiStatus.ERROR);
		responseModel.setResponse(null);
		List<CategoryEntity> listData = categoryService.getAllCategory();
		if (!CollectionUtils.isEmpty(listData)) {
				CategoryEntity categoryEntity = listData.stream()
						.filter(item-> item.getId() == categoryModel.getCategoryId())
						.findFirst().orElse(null);
				if (!ObjectUtils.isEmpty(categoryEntity)) {
					categoryService.deleteData(categoryEntity);
					responseModel.setMessage("DELETE SUCCESS");
					responseModel.setStatus(ApiStatus.SUCCESS);
				}
		}

		return responseModel;
	}
	
	@PostMapping
	public ResponseModel<ListCategoryResponseModel> addOrUpdateCategory(@RequestBody ListCategoryRequestModel listRequest) {
		ResponseModel<ListCategoryResponseModel> responseModel = new ResponseModel<>();
		responseModel.setMessage("ADD OR UPDATE PROMOTION");
		responseModel.setStatus(ApiStatus.ERROR);
		responseModel.setResponse(null);
		List<CategoryEntity> listData = categoryService.getAllCategory();
		if (CollectionUtils.isEmpty(listData)) listData = new ArrayList<>();
		if(!CollectionUtils.isEmpty(listRequest.getData())) {
			List<CategoryResponseModel> listReturn = new ArrayList<>();
			
			CategoryEntity entity;
			for(int i = 0; i < listRequest.getData().size() ; i++ ) {
				CategoryRequestModel item = listRequest.getData().get(i);
				
				if (validateExist(item.getCategoryName()) == false) {
					 if (item.getCategoryId() == 0) {
						entity = new CategoryEntity();
						SetAttrCategory(entity, item);
						categoryService.saveData(entity);
						SetResponseModel(listReturn, i, ApiStatus.SUCCESS);
						responseModel.setStatus(ApiStatus.SUCCESS);
					} else {
						
						entity = listData.stream().filter(k -> k.getId() == item.getCategoryId())
								.findFirst()
								.orElse(null);
						if (entity != null) {
							SetAttrCategory(entity, item);
							categoryService.saveData(entity);
							SetResponseModel(listReturn, i, ApiStatus.SUCCESS);
							responseModel.setStatus(ApiStatus.SUCCESS);
						} else {
							SetResponseModel(listReturn, i, ApiStatus.ERROR);
						}
					}
				} else {
					entity = listData.stream().filter(k -> k.getId() == item.getCategoryId())
							.findFirst()
							.orElse(null);
					if (entity != null) {
						SetAttrCategory(entity, item);
						categoryService.saveData(entity);
						SetResponseModel(listReturn, i, ApiStatus.SUCCESS);
						responseModel.setStatus(ApiStatus.SUCCESS);
					} else {
						SetResponseModel(listReturn, i, ApiStatus.ERROR);
					}
				}
			}
			ListCategoryResponseModel model = new ListCategoryResponseModel();
			model.setData(listReturn);
			responseModel.setResponse(model);
		}
		return responseModel;
	}
	private void SetResponseModel(List<CategoryResponseModel> listReturn, int i, ApiStatus status) {
        CategoryResponseModel categoryResponseModel = new CategoryResponseModel();
        categoryResponseModel.setIndex(i);
        categoryResponseModel.setStatusApi(status);
        listReturn.add(categoryResponseModel);
    }
	private void SetAttrCategory(CategoryEntity entity, CategoryRequestModel item) {
		entity.setId(item.getCategoryId());
		if(item.getCategoryName() != null)
		  entity.setCategoryName(item.getCategoryName());
		if(item.getDescription() != null)
	      entity.setDescription(item.getDescription());
        if(item.getPrice() != 0.0)
	      entity.setPrice(item.getPrice());
        if(item.getMaximumPeopleOfRoom() != 0)
	      entity.setMaximumPeopleOfRoom(item.getMaximumPeopleOfRoom());
        if(item.getNumberOfRoom() != 0)
	      entity.setNumberOfRoom(item.getNumberOfRoom());
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
                imageEntity.setCategoryEntity(entity);
                listImages.add(imageEntity);
            });
            entity.setImageEntities(listImages);
        }
        
        if (!CollectionUtils.isEmpty(item.getConvenientEntities())) {
            List<ConvenientEntity> listConvenients;
            if (CollectionUtils.isEmpty(entity.getConvenientEntities())){
                listConvenients = new ArrayList<>();
                item.getConvenientEntities().forEach(cv -> {
                	
                    ConvenientEntity convenientEntity= convenientService.findById(cv.getConvenientId());
                    
                    if(ObjectUtils.isEmpty(convenientEntity)) {
                       convenientEntity = new ConvenientEntity(); 	 
                       //convenientEntity.setId(cv.getConvenientId());
                       convenientEntity.setConvenientName(cv.getConvenientName()); 
                    }             
                    
                    listConvenients.add(convenientEntity);
                });
            } else {
            	List<ConvenientEntity> list2 = new ArrayList<>();
                item.getConvenientEntities().forEach(cv -> {
                	
                    ConvenientEntity convenientEntity= convenientService.findById(cv.getConvenientId());
                    
                    if(ObjectUtils.isEmpty(convenientEntity)) {
                       convenientEntity = new ConvenientEntity(); 	 
                       convenientEntity.setId(cv.getConvenientId());
                       convenientEntity.setConvenientName(cv.getConvenientName()); 
                    }             
                    list2.add(convenientEntity);
                });
            	
                listConvenients = list2;
            }
            
            entity.setConvenientEntities(listConvenients);
        }
	}
	private boolean validateExist(String name ) {
        CategoryEntity datas = categoryService.findByCategoryName(name);
        if (!ObjectUtils.isEmpty(datas)){
            
                return  true;
            
        }
        return  false;
    }
	
}
