package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.StockRepository;
import com.app.dao.OrderDetailsRepository;
import com.app.dao.PaymentRepository;

import com.app.entities.Stock;
import com.app.entities.OrderDetails;
import com.app.entities.OrderStatus;
import com.app.entities.Payment;


@Service
@Transactional
public class ShopServiceImpl implements IShopService {
	@Autowired
	OrderDetailsRepository orderDetailsRepo;

	

	@Autowired
	StockRepository stockRepo;

	@Autowired
	PaymentRepository paymentRepository;

	@Override
	public List<OrderDetails> getAllPlacedOrders(int restId) {
		return orderDetailsRepo.getPlacedOrders(OrderStatus.PLACED, restId);
	}

	@Override
	public List<OrderDetails> getAllAcceptedOrders(int restId) {

		return orderDetailsRepo.getAcceptedOrders(OrderStatus.PLACED, restId);
	}


	@Override
	public List<Stock> getAllStocks(int shopId) {

		return stockRepo.findAllByShop(shopId);
	}

	public List<Payment> getAllAcceptedOrdersPayment(int shopId) {

		return paymentRepository.findAll();
	}
}
