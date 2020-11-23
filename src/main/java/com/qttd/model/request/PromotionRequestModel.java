package com.qttd.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PromotionRequestModel {
	private long promotionId;
	
	private double discount;
	
	private String description;	
	
	private Date sDate;
	
	private Date eDate;
	
	private String code; 
	
	private String image;
}

