package com.app.service;

import java.util.List;

import com.app.entities.Stock;
import com.app.entities.OrderDetails;


public interface IShopService {

	List<OrderDetails> getAllPlacedOrders(int shoptId);
	
	List<OrderDetails> getAllAcceptedOrders(int shopId);


	

	List<Stock> getAllStocks(int shopId);



}
