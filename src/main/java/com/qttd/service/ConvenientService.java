package com.qttd.service;

import com.qttd.entities.ConvenientEntity;
import com.qttd.enums.ApiStatus;
import com.qttd.model.common.ResponseModel;
import com.qttd.model.request.ConvenientRequestModel;
import com.qttd.model.request.ListConvenientRequestModel;
import com.qttd.model.response.ConvenientResponseModel;
import com.qttd.model.response.ListConvenientResponseModel;
import com.qttd.repositories.ConvenientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConvenientService {

	@Autowired
	private ConvenientRepository convenientRepository;

	public ResponseModel<ConvenientResponseModel> deleteData(ConvenientRequestModel convenientModel) {
		ResponseModel<ConvenientResponseModel> responseModel = new ResponseModel<>();

		responseModel.setMessage("DELETE ERROR");
		responseModel.setStatus(ApiStatus.ERROR);
		responseModel.setResponse(null);
		List<ConvenientEntity> listData = (List<ConvenientEntity>) convenientRepository.findAll();
		if (!CollectionUtils.isEmpty(listData)) {
			ConvenientEntity convenientEntity = listData.stream()

					.filter(item-> item.getId() == convenientModel.getConvenientId())
					.filter(item-> item.getId() == convenientModel.getConvenientId())
					.findFirst().orElse(null);
			if (!ObjectUtils.isEmpty(convenientEntity)) {
				convenientRepository.delete(convenientEntity);
				responseModel.setMessage("DELETE SUCESS");
				responseModel.setStatus(ApiStatus.SUCCESS);
			}
		}
		return responseModel;
	}

	public ResponseModel<ListConvenientResponseModel> getAllConvenies() {
		ResponseModel<ListConvenientResponseModel> responseModel = new ResponseModel<>();

		List<ConvenientEntity> listData = (List<ConvenientEntity>) convenientRepository.findAll();

		responseModel.setMessage("GET CONVENIENCES");
		if(!CollectionUtils.isEmpty(listData)) {

			if(!CollectionUtils.isEmpty(listData)) {


				responseModel.setStatus(ApiStatus.SUCCESS);

				ListConvenientResponseModel model = new ListConvenientResponseModel();

				ConvenientResponseModel convenientResponseModel;

				List<ConvenientResponseModel> listReturn = new ArrayList<ConvenientResponseModel>();

				for(ConvenientEntity cv : listData) {
					convenientResponseModel = new ConvenientResponseModel();


					convenientResponseModel.setConvenientId(cv.getId());

					convenientResponseModel.setConvenientId(cv.getId());

					convenientResponseModel.setConvenientName(cv.getConvenientName());
					convenientResponseModel.setStatus(ApiStatus.SUCCESS);
					listReturn.add(convenientResponseModel);
				}

				model.setData(listReturn);
				responseModel.setResponse(model);
			} else {
				responseModel.setMessage("LIST IS NULL");
				responseModel.setStatus(ApiStatus.ERROR);
				responseModel.setResponse(null);
			}
			responseModel.setStatus(ApiStatus.SUCCESS);

			ListConvenientResponseModel model = new ListConvenientResponseModel();

			ConvenientResponseModel convenientResponseModel;

			List<ConvenientResponseModel> listReturn = new ArrayList<ConvenientResponseModel>();

			for(ConvenientEntity cv : listData) {
				convenientResponseModel = new ConvenientResponseModel();
				convenientResponseModel.setIndex(listData.indexOf(cv));
				convenientResponseModel.setConvenientId(cv.getId());
				convenientResponseModel.setConvenientName(cv.getConvenientName());
				listReturn.add(convenientResponseModel);
			}

			model.setData(listReturn);
			responseModel.setResponse(model);
		} else {
			responseModel.setMessage("LIST IS NULL");
			responseModel.setStatus(ApiStatus.ERROR);
			responseModel.setResponse(null);
		}
		return responseModel;
	}

	public ResponseModel<ListConvenientResponseModel> addOrUpdateConvenient(ListConvenientRequestModel listRequest) {
		ResponseModel<ListConvenientResponseModel> responseModel = new ResponseModel<>();
		responseModel.setMessage("ADD OR UPDATE CONVENIENT");
		responseModel.setStatus(ApiStatus.ERROR);
		responseModel.setResponse(null);

		// get list data from db
		List<ConvenientEntity> listData = (List<ConvenientEntity>) convenientRepository.findAll();

		// list errors
		List<String> errs = new ArrayList<>();
		// list data need save
		List<ConvenientEntity> listSave = new ArrayList<>();

		if (CollectionUtils.isEmpty(listData)) listData = new ArrayList<>();
		if(!CollectionUtils.isEmpty(listRequest.getData())) {
			List<ConvenientResponseModel> listReturn = new ArrayList<>();
			ConvenientResponseModel convenientResponseModel;
			ConvenientEntity entity;
			for(int i = 0; i < listRequest.getData().size() ; i++ ) {
				ConvenientRequestModel item = listRequest.getData().get(i);
				if (validateExistName(item.getConvenientName()) == false) {
					if (item.getConvenientId() == 0) {
						entity = new ConvenientEntity();
						entity.setConvenientName(item.getConvenientName());
						listSave.add(entity);
						SetResponseModel(listReturn, i, ApiStatus.SUCCESS);
					} else {
						entity = listData.stream().filter(k -> k.getId() == item.getConvenientId())
								.findFirst()
								.orElse(null);
						if (entity != null) {
							entity.setConvenientName(item.getConvenientName());
							listSave.add(entity);
							SetResponseModel(listReturn, i, ApiStatus.SUCCESS);
						} else {
							SetResponseModel(listReturn, i, ApiStatus.ERROR);
							errs.add("Errors " + i);
						}
					}
				} else {
					SetResponseModel(listReturn, i, ApiStatus.ERROR);
					errs.add("Errors " + i);
				}
			}
			if (listSave.isEmpty() || errs.size() > 0) {
				responseModel.setStatus(ApiStatus.ERROR);
			} else {
				convenientRepository.saveAll(listSave);
				responseModel.setStatus(ApiStatus.SUCCESS);
			}
			ListConvenientResponseModel model = new ListConvenientResponseModel();
			model.setData(listReturn);
			responseModel.setResponse(model);
		}
		return responseModel;
	}

	private boolean validateExistName(String name ) {
		List<ConvenientEntity> datas = convenientRepository.findByConvenientName(name);
		if (!CollectionUtils.isEmpty(datas)){
			if (datas.size() > 0) {
				return  true;
			}
		}
		return  false;
	}

	private void SetResponseModel(List<ConvenientResponseModel> listReturn, int i, ApiStatus status) {
		ConvenientResponseModel convenientResponseModel;
		convenientResponseModel = new ConvenientResponseModel();
		convenientResponseModel.setIndex(i);
		convenientResponseModel.setStatus(status);
		listReturn.add(convenientResponseModel);
	}

	public ConvenientEntity findById(long id) {
		return convenientRepository.findById(id).get();
	}
}
