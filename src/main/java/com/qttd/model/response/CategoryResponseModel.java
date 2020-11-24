package com.qttd.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.qttd.enums.ApiStatus;
import com.qttd.model.request.ConvenientRequestModel;
import com.qttd.model.request.ImageRequestModel;
import com.qttd.model.request.ReviewRequestModel;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponseModel {
	private long categoryId;
	
	private int index;
	
	private String categoryName;
	
	private String description;
	
	private double price;
	
	private int numberOfRoom;
	
	private int maximumPeopleOfRoom;
	
	private ApiStatus statusApi;
	
	List<ImageRequestModel> images;
	
	List<ReviewRequestModel> reviews;
	
	private List<ConvenientRequestModel> convenientEntities;
	
	
}
