package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.CartRepository;
import com.app.dao.StockRepository;
import com.app.dao.UserRepository;
import com.app.entities.Cart;
import com.app.entities.Stock;
import com.app.entities.User;

@Service
@Transactional
public class CartServiceImpl implements ICartService {

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private StockRepository stockRepo;
	@Autowired
	private CartRepository cartRepo;

//	@Override
//	public String addItemToCart(Integer MenuId, Integer quantity, Integer userId) {
//		User customer = userRepo.findById(userId).get();
//		Menu menu = menuRepo.findById(MenuId).get();
//		cartRepo.save(new Cart(quantity, menu, customer));
//		return quantity + " " + menu.getProductName() + " added to cart";
//	}

	@Override
	public Optional<Cart> findCartItemByMenuIdAndUserId(Integer stockId, Integer userId) {
		List<Cart> cartItems = cartRepo.findCartBySelectedStockIdAndCurrentUserId(stockId, userId);
		// If the list is not empty, return the first item (assuming only one should
		// exist)
		if (!cartItems.isEmpty()) {
			return Optional.of(cartItems.get(0));
		}
		// If the item doesn't exist, return an empty Optional
		return Optional.empty();
	}

	@Override
	public String addItemToCart(Integer stockId, Integer quantity, Integer userId) {

		Optional<Cart> existingCartItem = findCartItemByMenuIdAndUserId(stockId, userId);
			System.out.println(existingCartItem);
		if (existingCartItem.isPresent()) {
			// If it does, update the quantity
			Cart cartItem = existingCartItem.get();
			cartItem.setQuantity(cartItem.getQuantity() + quantity);
			cartRepo.save(cartItem);
			return "Quantity updated";
		} else {

			User customer = userRepo.findById(userId).get();
			Stock menu = stockRepo.findById(stockId).get();
			cartRepo.save(new Cart(quantity, menu, customer));
			return quantity + " " + menu.getProductName() + " added to cart";
		}
	}

	@Override
	public List<Cart> getAllCartContents(Integer userId) {
		List<Cart> cart = cartRepo.findAllItemsByUser(userId);
		return cart;
	}

	@Override
	public Optional<Cart> findById(Integer cartId) {
		return cartRepo.findById(cartId);
	}

	@Override
	public void deleteFromCart(Integer cartId) {
		cartRepo.deleteById(cartId);
	}

	@Override
	public void deleteAllFromCart(int userId) {
		cartRepo.deleteAll(cartRepo.findAllItemsByUser(userId));
	}

	@Override
	public String updateQuantity(Integer cartId, Integer quantity) {
		Cart cartItem = cartRepo.findById(cartId).get();
		cartItem.setQuantity(quantity);
		return "success";
	}

}
