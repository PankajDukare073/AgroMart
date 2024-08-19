package com.app.service;

import java.util.List;

import com.app.entities.FertilizerOrder;

public interface IDeliveryService {
	public List<FertilizerOrder> allPlacedOrders();

	void assignDeliveryBoy(int userId, int orderId);

	FertilizerOrder updateStatus(int orderId, String status);
}