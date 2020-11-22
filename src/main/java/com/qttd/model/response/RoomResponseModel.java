package com.qttd.model.response;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.qttd.entities.CategoryEntity;
import com.qttd.enums.ApiStatus;
import com.qttd.enums.RoomStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomResponseModel {
	 private int index;
	 private long roomId;
	 private String roomNumber;
	 @Enumerated(EnumType.STRING)
	 private RoomStatus roomStatus;
	 @Enumerated(EnumType.STRING)
	 private ApiStatus statusApi;
	 private long categoryId;
	 private String categoryName;
	 private CategoryEntity categoryEntity;
	//private List<OrderEntity> orderEntities;
}
