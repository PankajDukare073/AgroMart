package com.app.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.StockDto;
import com.app.entities.Stock;

public interface IStockService 
{
	Stock addStock(Stock stock, MultipartFile multipartFile);
	
	Stock editStock(StockDto menuDto, int id);
	
	String deleteStock(int id);
	
	public List<Stock> findAll();

	List<Stock> findByCategory(int id);

	List<Stock> findByShop(int id);

	List<Stock> findByType(String type);
	
}
