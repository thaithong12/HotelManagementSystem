package com.qttd.service;
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

	public List<PromotionEntity> findByCode(String code) {
		return promotionRepository.findByCode(code);
	}
}
