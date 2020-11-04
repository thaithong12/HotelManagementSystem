package com.qttd.model.response;
import java.util.Date;

import com.qttd.enums.ApiStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PromotionResponseModel {
	private int index;
	private long promotionId;
	
	private double discount;
	
	private String description;
	
	
	private Date sDate;
	
	private Date eDate;
	
	private String code; 
	
	private ApiStatus statusApi;
	private String image;
}
