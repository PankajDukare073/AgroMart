package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {

	@Query("Select c from Cart c join fetch c.selectedStock join fetch c.currentUser where c.currentUser.id=?1")
	List<Cart> findAllItemsByUser(Integer userId);

	 @Query("Select c from Cart c where c.selectedStock.id = ?1 and c.currentUser.id = ?2")
	 List<Cart> findCartBySelectedStockIdAndCurrentUserId(Integer shopId, Integer userId);
}
