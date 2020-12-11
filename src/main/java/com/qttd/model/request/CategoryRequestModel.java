package com.qttd.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.qttd.entities.ConvenientEntity;
import com.qttd.entities.ImageEntity;
import com.qttd.entities.ReviewEntity;
import com.qttd.entities.RoomEntity;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryRequestModel {
	private long categoryId;
	private int index;
	private String categoryName;
	private String description;
	private double price;
	private int numberOfRoom;
	private int maximumPeopleOfRoom;
	List<ImageRequestModel> imageEntities;
	//private List<RoomEntity> roomEntities;
	private List<ConvenientRequestModel> convenientEntities;
	List<ReviewRequestModel> reviewEntities;
}
