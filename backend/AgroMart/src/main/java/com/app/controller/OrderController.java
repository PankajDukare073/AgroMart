package com.app.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.OrderPlaceDto;
import com.app.dto.ResponseDto;
import com.app.service.OrderServiceImpl;

@RestController
@RequestMapping("/order")
public class OrderController {

	@Autowired
	private OrderServiceImpl orderService;

	@PostMapping("/place")
	public ResponseEntity<?> placeOrderFromCart(@RequestBody OrderPlaceDto orderInput) {

		int userId = orderInput.getUserId();
		int addrId = orderInput.getAddressId();
		String paymentMode = orderInput.getPaymentMode();
		return ResponseEntity.ok().body(orderService.placeOrderForUser(userId, addrId, paymentMode));
	}

	@GetMapping("/all")
	public ResponseEntity<?> getAllOrders() {
		return ResponseEntity.ok().body(orderService.getAllOrders());
	}

	// current orders for delivery boy
	@GetMapping("/pending")
	public ResponseEntity<?> getAllPendingOrders() {
		return ResponseEntity.ok().body(orderService.getAllPendingOrders());
	}

	// all order assigned to delivery boy
	@GetMapping("/assigned/{deliverBoyId}")
	public ResponseEntity<?> getAssignedOrders(@PathVariable int deliverBoyId) {
		return ResponseEntity.ok().body(new ResponseDto<>("success" ,orderService.getAllAssignedOrders(deliverBoyId)));
				//ResponseEntity.ok().body(orderService.getAllAssignedOrders(deliverBoyId));
	}

	// get all order of customer
	@GetMapping("/myorders/{userId}")
	public ResponseEntity<?> getMyOrders(@PathVariable int userId) {
		return ResponseEntity.ok().body(new ResponseDto<>("success", orderService.getMyOrders(userId)));
	}

	// update order status
	@PutMapping("/update_status")
	public ResponseEntity<?> updateOrderStatus(@RequestBody HashMap<String, String> orderInput) {
		orderService.updateOrderStatus(Integer.parseInt(orderInput.get("orderId")), orderInput.get("status"),
				Integer.parseInt(orderInput.get("deliveryId")));
		return new ResponseEntity<>(new ResponseDto<>("success", "Order Status Changed Successfully!!"), HttpStatus.OK);
	}
}
