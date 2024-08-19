package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.entities.Cart;

public interface ICartService 
{
	public String addItemToCart(Integer MenuId, Integer quantity, Integer userId);
	
	public List<Cart> getAllCartContents(Integer userId);
	
	public void deleteFromCart(Integer cartId);

	Optional<Cart> findById(Integer cartId);

	void deleteAllFromCart(int userId);

	String updateQuantity(Integer cartId, Integer quantity);
	
	Optional<Cart> findCartItemByMenuIdAndUserId(Integer menuId, Integer userId);
}
