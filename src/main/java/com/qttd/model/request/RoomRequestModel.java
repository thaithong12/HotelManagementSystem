package com.qttd.model.request;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.qttd.entities.CategoryEntity;
import com.qttd.entities.OrderEntity;
import com.qttd.enums.RoomStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomRequestModel {
	private long roomId;
	private int index;
	private String roomNumber;
	@Enumerated(EnumType.STRING)
    private RoomStatus roomStatus;
	private long categoryId;
	//private CategoryRequestModel categoryEntity;
	//private List<OrderEntity> orderEntities;
}
