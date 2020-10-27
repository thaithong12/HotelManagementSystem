package com.qttd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qttd.entities.ConvenientEntity;
import com.qttd.repositories.ConvenientRepository;

@Service
public class ConvenientService {

	@Autowired
	private ConvenientRepository convenientRepository;
	
	public List<ConvenientEntity> getAllConvenients() {
		return (List<ConvenientEntity>) convenientRepository.findAll();
	}

	public void saveData(ConvenientEntity c) {
		convenientRepository.save(c);
	}

	public void deleteData(ConvenientEntity c) {
		convenientRepository.delete(c);
	}

	public List<ConvenientEntity> findByName(String name) {
		return convenientRepository.findByConvenientName(name);
	}
}
