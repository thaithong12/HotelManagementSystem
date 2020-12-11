package com.qttd.repositories;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.qttd.entities.RoomEntity;
@Repository
public interface RoomRepository extends CrudRepository<RoomEntity, Long>{
	RoomEntity findByRoomNumber(String roomNumber);
	RoomEntity findById(long id);
}
