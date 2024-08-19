package com.app.service;

import java.util.List;

import com.app.dto.CategoryDto;
import com.app.entities.Category;

public interface ICategoryService {

	public Category addCategory(Category cat);
	
	public List<Category> getAllStockTypes() ;
	
	public Category editCategory(CategoryDto catdto,int id);
	
	public Category getCategoryById(int catId);
}
