package com.qttd.api;

import com.qttd.model.common.ResponseModel;
import com.qttd.model.request.ConvenientRequestModel;
import com.qttd.model.request.ListConvenientRequestModel;
import com.qttd.model.response.ConvenientResponseModel;
import com.qttd.model.response.ListConvenientResponseModel;
import com.qttd.service.ConvenientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/conveniences")
public class ConvenientAPIController {
	
	@Autowired
	private ConvenientService convenientService;

	@GetMapping
	public ResponseEntity<?> getConvenients() {
		ResponseModel<ListConvenientResponseModel> responseModel= convenientService.getAllConvenies();
		return ResponseEntity.status(HttpStatus.OK).body(responseModel);
	}

	@DeleteMapping
	public ResponseEntity<?> deleteConvenient(@RequestBody ConvenientRequestModel convenientModel) {
		ResponseModel<ConvenientResponseModel> responseModel = convenientService.deleteData(convenientModel);
		return ResponseEntity.status(HttpStatus.OK).body(responseModel);
	}

	@PostMapping
	public ResponseEntity<?> addOrUpdateConvenient(@RequestBody ListConvenientRequestModel listRequest) {
		ResponseModel<ListConvenientResponseModel> responseModel = convenientService.addOrUpdateConvenient(listRequest);
		return ResponseEntity.status(HttpStatus.OK).body(responseModel);
	}
}

