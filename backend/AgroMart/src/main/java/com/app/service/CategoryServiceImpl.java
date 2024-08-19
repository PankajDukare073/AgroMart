package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.CategoryRepository;
import com.app.dto.CategoryDto;
import com.app.entities.Category;

@Service
@Transactional
public class CategoryServiceImpl implements ICategoryService {
	@Autowired
	CategoryRepository catRepo;

	public Category addCategory(Category cat) {

		return catRepo.save(cat);
	}

	public List<Category> getAllStockTypes() {
		return catRepo.findAllAcending();
	}
	
	public Category editCategory(CategoryDto catdto,int id) {
		Category cat = catRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid Category !!! Can not update details"));
		cat.setName(catdto.getName());
		return cat;
	}

	public Category getCategoryById(int catId) {
		return catRepo.findById(catId).orElseThrow(() -> new ResourceNotFoundException("Invalid Category Id"));
	}
}
