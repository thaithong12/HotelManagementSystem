package com.qttd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qttd.entities.CategoryEntity;
import com.qttd.repositories.CategoryRepository;

@Service
public class CategoryService {
	@Autowired
	private CategoryRepository categoryRepository;
	
	public List<CategoryEntity> getAllCategory() {
		return (List<CategoryEntity>) categoryRepository.findAll();
	}

	public void saveData(CategoryEntity p) {
		categoryRepository.save(p);
	}

	public void deleteData(CategoryEntity p) {
		categoryRepository.delete(p);
	}
	
	public CategoryEntity findByCategoryName(String name) {
		return categoryRepository.findByCategoryName(name);
	} 
	
	public CategoryEntity findById(long Id)
	{
		return categoryRepository.findById(Id).get();
	}
}
