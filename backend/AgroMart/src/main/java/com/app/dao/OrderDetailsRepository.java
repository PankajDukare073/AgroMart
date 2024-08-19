package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.OrderDetails;
import com.app.entities.OrderStatus;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Integer> {

	@Query("Select o from OrderDetails o join fetch o.currentOrder where o.currentOrder.id=?1")
	List<OrderDetails> findAllByOrderId(Integer id);

	@Query("Select o from OrderDetails o join fetch o.currentOrder  join fetch o.selectedProduct where o.currentOrder.status=?1 and o.selectedProduct.shop.id=?2")
	List<OrderDetails> getPlacedOrders(OrderStatus status, Integer shopId);

	@Query("Select o from OrderDetails o join fetch o.currentOrder  join fetch o.selectedProduct where o.currentOrder.status!=?1 and o.selectedProduct.shop.id=?2 order by o.currentOrder.orderTime desc")
	List<OrderDetails> getAcceptedOrders(OrderStatus status, Integer shopId);
}
