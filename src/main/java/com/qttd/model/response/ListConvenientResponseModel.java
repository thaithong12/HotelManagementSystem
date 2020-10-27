package com.qttd.model.response;

import java.util.List;

import com.qttd.model.response.ConvenientResponseModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListConvenientResponseModel {
	
	private List<ConvenientResponseModel> data;
	
}
