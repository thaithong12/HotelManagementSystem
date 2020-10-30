package com.qttd.repositories;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.qttd.entities.PromotionEntity;

import java.util.List;
@Repository

	public interface PromotionRepository extends CrudRepository<PromotionEntity, Integer>{
	    public List<PromotionEntity> findByCode(String code);
}
