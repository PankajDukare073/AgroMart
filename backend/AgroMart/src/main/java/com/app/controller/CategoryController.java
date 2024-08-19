package com.app.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CategoryDto;
import com.app.dto.ResponseDto;
import com.app.entities.Category;
import com.app.entities.Type;
import com.app.service.CategoryServiceImpl;

@RestController
@RequestMapping("/category")
public class CategoryController {
	
	@Autowired
	private CategoryServiceImpl categoryservice;
	
	// adding new category
	@PostMapping("/add")
	public ResponseEntity<?> addNewCategory(@RequestBody Category cat){
	
		Category newcategory=categoryservice.addCategory(cat);
		return new ResponseEntity<>(new ResponseDto<Category>("success",newcategory),HttpStatus.CREATED);
	}
	
	// get all categories
	@GetMapping("/all")
	public ResponseEntity<?> findAllStockType() {
		List<Category> list = categoryservice.getAllStockTypes();
		//List<MenuType> result = new ArrayList<MenuType>();
		return ResponseDto.success(list);
	}
	
	// get all Types 
	@GetMapping("/allTypes")
	public ResponseEntity<?> findAllTypes() 
	{
		List<Type> list = new ArrayList<Type>();
				
		for (Type type : Type.values()) {
			list.add(type);
		}
		return ResponseDto.success(list);
	}
	
	@PutMapping("/update/{catId}")
	public ResponseEntity<?> updateCategory(@RequestBody CategoryDto catDto, @PathVariable int catId){
		return ResponseDto.success(categoryservice.editCategory(catDto, catId));
	}
	
	@GetMapping("/getById/{catId}")
	public ResponseEntity<?> getStockById(@PathVariable int catId){
		
		Category cat = categoryservice.getCategoryById(catId);
		return ResponseEntity.ok().body(new ResponseDto<Category>("success", cat));
	}
}
