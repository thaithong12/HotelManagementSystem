package com.qttd.service;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qttd.entities.PromotionEntity;

import com.qttd.repositories.PromotionRepository;

@Service
public class PromotionService {
	@Autowired
	private PromotionRepository promotionRepository;
	
	public List<PromotionEntity> getAllPromotion() {
		return (List<PromotionEntity>) promotionRepository.findAll();
	}

	public void saveData(PromotionEntity p) {
		promotionRepository.save(p);
	}

	public void deleteData(PromotionEntity p) {
		promotionRepository.delete(p);
	}
     
	public PromotionEntity findByPromotionId(long promotionId) {
		return promotionRepository.findById(promotionId);
	} 
	public PromotionEntity findByCode(String code) {
		return promotionRepository.findByCode(code);
	}
	public List<PromotionEntity> findByDiscount(double discount) {
		return promotionRepository.findByDiscount(discount);
	}
	public List<PromotionEntity> findBySDate(Date sDate) {
		return promotionRepository.findBySDate(sDate);
	}
	public List<PromotionEntity> findByEDate(Date eDate) {
		return promotionRepository.findByEDate(eDate);
	}
	public List<PromotionEntity> findByDescription(String description) {
		return promotionRepository.findByDescription(description);
	}
	public List<PromotionEntity> findByImage(String image) {
		return promotionRepository.findByImage(image);
	}
}
