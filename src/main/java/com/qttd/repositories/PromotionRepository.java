package com.qttd.repositories;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.qttd.entities.PromotionEntity;

import java.util.Date;
import java.util.List;
@Repository

	public interface PromotionRepository extends CrudRepository<PromotionEntity, Long>{
	    public PromotionEntity findById(long promotionId);
	    public PromotionEntity findByCode(String code);
	    public List<PromotionEntity> findByDiscount(double discount);
	    public List<PromotionEntity> findBySDate(Date sDate);
	    public List<PromotionEntity> findByEDate(Date eDate);
	    public List<PromotionEntity> findByDescription(String description);
	    public List<PromotionEntity> findByImage(String image);
}
