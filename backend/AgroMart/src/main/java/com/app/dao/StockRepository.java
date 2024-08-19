package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Category;
import com.app.entities.Stock;
import com.app.entities.Type;

public interface StockRepository extends JpaRepository<Stock, Integer> {

	@Query("Select s from Stock s where s.category=?1 and s.status=1")
	List<Stock> getStockList(Category cat);
	
	@Query("Select s from Stock s where s.status=1")
	List<Stock> findAllByStatus();
	
	@Query("Select s from Stock s where s.shop.id=?1")
	List<Stock> findAllByShop(Integer shopid);

	@Query("Select s from Stock s where s.type=?1 and s.status=1")
	List<Stock> getStockListByType(Type type);
	

}