package com.qttd.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qttd.entities.CategoryEntity;
import com.qttd.entities.RoomEntity;
import com.qttd.repositories.RoomRepository;

@Service
public class RoomService {
	@Autowired
	private RoomRepository roomRepository;
	
	public List<RoomEntity> getAllRoom() {
		return (List<RoomEntity>)roomRepository.findAll();
	}

	public void saveData(RoomEntity p) {
		roomRepository.save(p);
	}

	public void deleteData(RoomEntity p) {
		roomRepository.delete(p);
	}
	
	public RoomEntity findByRoomNumber(String roomNumber) {
		return roomRepository.findByRoomNumber(roomNumber);
	}
	public RoomEntity findById(long id) {
		return roomRepository.findById(id);
	}
}
