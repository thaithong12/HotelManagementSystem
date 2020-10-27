package com.qttd.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.qttd.common.ResponseModel;
import com.qttd.entities.ConvenientEntity;
import com.qttd.enums.ApiStatus;
import com.qttd.model.response.ConvenientResponseModel;
import com.qttd.model.response.ListConvenientTypeResponseModel;
import com.qttd.service.ConvenientService;

@RestController
@CrossOrigin
public class ConvenientAPI {
	
	@Autowired
	private ConvenientService convenientService;
	
	@SuppressWarnings("null")
	@RequestMapping(value = "/api/convenient", method = RequestMethod.GET)
	@ResponseBody
	public ResponseModel<ListConvenientTypeResponseModel> getConvenients() {
		ResponseModel<ListConvenientTypeResponseModel> responseModel = new ResponseModel<>();
		
		List<ConvenientEntity> listData = convenientService.getAllConvenients();
		
		if(!CollectionUtils.isEmpty(listData)) {
			responseModel.setMessage("GET SUCCESS");
			responseModel.setStatus(ApiStatus.SUCCESS);
			ListConvenientTypeResponseModel model = new ListConvenientTypeResponseModel();
			ConvenientResponseModel convenientResponseModel = new ConvenientResponseModel();
			
			List<ConvenientResponseModel> listReturn = new ArrayList<ConvenientResponseModel>();
			listData.forEach(item -> {
				convenientResponseModel.setConvenientId(item.getConvenientId());
				convenientResponseModel.setConvenientName(item.getConvenientName());
				convenientResponseModel.setStatus(ApiStatus.SUCCESS);
				listReturn.add(convenientResponseModel);
			});
			model.setData(listReturn);
			responseModel.setResponse(model);
		} else {
			responseModel.setMessage("LIST IS NULL");
			responseModel.setStatus(ApiStatus.ERROR);
			responseModel.setResponse(null);
		}
		return responseModel;
		
	}
	
	

}
