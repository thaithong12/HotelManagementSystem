package com.qttd.model.response;

import com.qttd.enums.ApiStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConvenientResponseModel {
	
	private int index;
	
	private int convenientId;
	
	private String convenientName;
	
	private ApiStatus status;
	
}