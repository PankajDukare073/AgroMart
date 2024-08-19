package com.app.service;

import java.util.List;

import com.app.dto.FertilizerOrderDto;

public interface IOrderService {
	String placeOrderForUser(int userId, int addrId, String paymentMode);

	List<FertilizerOrderDto> getAllOrders();

	List<FertilizerOrderDto> getAllPendingOrders();

	List<FertilizerOrderDto> getAllAssignedOrders(int deliveryBoyId);

	void updateOrderStatus(int orderId, String status, int deliveryId);

	List<FertilizerOrderDto> getMyOrders(int userId);
}
