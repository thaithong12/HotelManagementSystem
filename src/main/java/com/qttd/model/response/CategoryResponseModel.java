package com.qttd.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.qttd.entities.ImageEntity;
import com.qttd.entities.ReviewEntity;
import com.qttd.entities.RoomEntity;
import com.qttd.enums.ApiStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponseModel {
	private int categoryId;
	
	private int index;
	
	private String categoryName;
	
	private String description;
	
	private Double price;
	
	private int numberOfRoom;
	
	private int maximumPeopleOfRoom;
	
	private ApiStatus statusApi;
	
	private List<ImageEntity> imageEntities;
	
	private List<RoomEntity> roomEntities;
	
	private List<ReviewEntity> reviewEntities;
}
