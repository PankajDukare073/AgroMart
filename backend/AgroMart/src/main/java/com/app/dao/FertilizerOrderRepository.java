package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.FertilizerOrder;
import com.app.entities.OrderStatus;

public interface FertilizerOrderRepository extends JpaRepository<FertilizerOrder, Integer> {

	@Query("Select o from FertilizerOrder o where o.farmer.id=?1 order by o.orderTime desc")
	List<FertilizerOrder> findAllOrdersByUserId(Integer Id);
	
	@Query("Select o from FertilizerOrder o where o.deliverboy.id=?1 order by o.orderTime desc")
	List<FertilizerOrder> findAllOrdersByDeliverBoyId(Integer Id);

	@Query("select f from FertilizerOrder f where f.id=?1")
	FertilizerOrder findByOrderId(int id);

	@Query("Select o from FertilizerOrder o where o.status=?1 order by o.orderTime desc")
	List<FertilizerOrder> findByStatus(OrderStatus status);
}
