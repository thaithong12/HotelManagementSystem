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

}
