package com.qttd.api;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qttd.entities.CategoryEntity;
import com.qttd.entities.ConvenientEntity;
import com.qttd.entities.ImageEntity;
import com.qttd.entities.RoomEntity;
import com.qttd.entities.ServiceEntity;
import com.qttd.enums.ApiStatus;
import com.qttd.model.common.ResponseModel;
import com.qttd.model.request.CategoryRequestModel;
import com.qttd.model.request.ImageRequestModel;
import com.qttd.model.request.ListCategoryRequestModel;
import com.qttd.model.request.ListRoomRequestModel;
import com.qttd.model.request.RoomRequestModel;
import com.qttd.model.response.CategoryResponseModel;
import com.qttd.model.response.ListCategoryResponseModel;
import com.qttd.model.response.ListRoomResponseModel;
import com.qttd.model.response.ListServiceResponseModel;
import com.qttd.model.response.RoomResponseModel;
import com.qttd.model.response.ServiceResponseModel;
import com.qttd.service.CategoryService;
import com.qttd.service.RoomService;

@RestController
@CrossOrigin
@RequestMapping("/api/rooms")
public class RoomAPI {
	@Autowired
	RoomService roomService;
	@Autowired
	CategoryService categoryService;
	
	@GetMapping
    public ResponseModel<ListRoomResponseModel> getAllRoom() {
        ResponseModel<ListRoomResponseModel> responseModel = new ResponseModel<>();

        List<RoomEntity> listData = roomService.getAllRoom();
        
        if(!CollectionUtils.isEmpty(listData)) {
        	
            responseModel.setMessage("GET SUCCESS");
            responseModel.setStatus(ApiStatus.SUCCESS);
            
            ListRoomResponseModel model = new ListRoomResponseModel();
            
            RoomResponseModel roomResponseModel;

            List<RoomResponseModel> listReturn = new ArrayList<RoomResponseModel>();
            
            for(RoomEntity item : listData) {
                roomResponseModel = new RoomResponseModel();
            	roomResponseModel.setRoomId(item.getId());
            	roomResponseModel.setRoomNumber(item.getRoomNumber());
            	roomResponseModel.setRoomStatus(item.getRoomStatus());
                roomResponseModel.setStatusApi(ApiStatus.SUCCESS);    	
                if(!ObjectUtils.isEmpty(item.getCategoryEntity()))
                {
                  roomResponseModel.setCategoryId(item.getCategoryEntity().getId());	
                  roomResponseModel.setCategoryName(item.getCategoryEntity().getCategoryName());
                }
                //roomResponseModel.setCategoryEntity(item.getCategoryEntity());                
                listReturn.add(roomResponseModel);
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
	
	@DeleteMapping
	public ResponseModel<RoomResponseModel> deleteRoom(@RequestBody RoomRequestModel roomModel) {
		ResponseModel<RoomResponseModel> responseModel = new ResponseModel<>();

		responseModel.setMessage("DELETE ERROR");
		responseModel.setStatus(ApiStatus.ERROR);
		responseModel.setResponse(null);
		List<RoomEntity> listData = roomService.getAllRoom();
		if (!CollectionUtils.isEmpty(listData)) {
				RoomEntity roomEntity = listData.stream()
						.filter(item-> item.getId() == roomModel.getRoomId())
						.findFirst().orElse(null);
				if (!ObjectUtils.isEmpty(roomEntity)) {
					roomService.deleteData(roomEntity);
					responseModel.setMessage("DELETE SUCCESS");
					responseModel.setStatus(ApiStatus.SUCCESS);
				}
		}

		return responseModel;
	}
	
	@PostMapping
	public ResponseModel<ListRoomResponseModel> addOrUpdateRoom(@RequestBody ListRoomRequestModel listRequest) {
		ResponseModel<ListRoomResponseModel> responseModel = new ResponseModel<>();
		responseModel.setMessage("ADD OR UPDATE PROMOTION");
		responseModel.setStatus(ApiStatus.ERROR);
		responseModel.setResponse(null);
		List<RoomEntity> listData = roomService.getAllRoom();
		if (CollectionUtils.isEmpty(listData)) listData = new ArrayList<>();
		if(!CollectionUtils.isEmpty(listRequest.getData())) {
			List<RoomResponseModel> listReturn = new ArrayList<>();
			
			RoomEntity entity;
			for(int i = 0; i < listRequest.getData().size() ; i++ ) {
				RoomRequestModel item = listRequest.getData().get(i);
				
				if (validateExist(item.getRoomNumber()) == false) {
					 if (item.getRoomId() == 0) {
						entity = new RoomEntity();
						SetAttrRoom(entity, item);
						roomService.saveData(entity);
						SetResponseModel(listReturn, i, ApiStatus.SUCCESS);
						responseModel.setStatus(ApiStatus.SUCCESS);
					} else {
						
						entity = listData.stream().filter(k -> k.getId() == item.getRoomId())
								.findFirst()
								.orElse(null);
						if (entity != null) {
							SetAttrRoom(entity, item);
							roomService.saveData(entity);
							SetResponseModel(listReturn, i, ApiStatus.SUCCESS);
							responseModel.setStatus(ApiStatus.SUCCESS);
						} else {
							SetResponseModel(listReturn, i, ApiStatus.ERROR);
						}
					}
				} else {
					entity = listData.stream().filter(k -> k.getId() == item.getRoomId())
							.findFirst()
							.orElse(null);
					if (entity != null) {
						SetAttrRoom(entity, item);
						roomService.saveData(entity);
						SetResponseModel(listReturn, i, ApiStatus.SUCCESS);
						responseModel.setStatus(ApiStatus.SUCCESS);
					} else {
						SetResponseModel(listReturn, i, ApiStatus.ERROR);
					}
				}
			}
			ListRoomResponseModel model = new ListRoomResponseModel();
			model.setData(listReturn);
			responseModel.setResponse(model);
		}
		return responseModel;
	}
	private void SetAttrRoom(RoomEntity entity, RoomRequestModel item) {
		entity.setId(item.getRoomId());
		List<RoomEntity> listRoomEntity = roomService.getAllRoom();
		int d = 0;
		for (RoomEntity roomEntity : listRoomEntity) {
			if(roomEntity.getRoomNumber().equals(item.getRoomNumber()))
			{
				d = 1;
				break;
			}	
		}
	    if(d == 0)
		  entity.setRoomNumber(item.getRoomNumber());
		entity.setRoomStatus(item.getRoomStatus());
		if(ObjectUtils.isEmpty(categoryService.findById(item.getCategoryId())))
		{
			CategoryEntity categoryEntity = new CategoryEntity();
			categoryEntity.setId(item.getCategoryId());
		}
		else
		{  
			CategoryEntity categoryEntity= categoryService.findById(item.getCategoryId());	
		    entity.setCategoryEntity(categoryEntity);
	    }
		
	}
	private void SetResponseModel(List<RoomResponseModel> listReturn, int i, ApiStatus status) {
        RoomResponseModel roomResponseModel = new RoomResponseModel();
        roomResponseModel.setIndex(i);
        roomResponseModel.setStatusApi(status);
        listReturn.add(roomResponseModel);
    }
	private boolean validateExist(String name ) {
        RoomEntity data = roomService.findByRoomNumber(name);
        if (!ObjectUtils.isEmpty(data)){
            
                return  true;
            
        }
        return  false;
    }

}
