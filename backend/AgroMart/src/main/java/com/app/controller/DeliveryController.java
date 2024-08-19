package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AssignDeliveryBoyDto;
import com.app.dto.ResponseDto;
import com.app.service.DeliveryServiceImpl;

@RestController
@RequestMapping("/delivery")
public class DeliveryController {
	
	@Autowired
	private DeliveryServiceImpl deliveryService;

	@GetMapping("/placedOrders")
	public ResponseEntity<?> getAllOrders() {
		return new ResponseEntity<>(new ResponseDto<>("success", deliveryService.allPlacedOrders()), HttpStatus.OK);
	}

	@PutMapping("/updateStatus/{orderId}/{status}")
	public ResponseEntity<?> updateStatus(@PathVariable String status, @PathVariable int orderId) {

		return new ResponseEntity<>(new ResponseDto<>("success", deliveryService.updateStatus(orderId, status)),
				HttpStatus.OK);
	}

	@PutMapping("/update")
	public ResponseEntity<?> assignDeliveryBoy(@RequestBody AssignDeliveryBoyDto assignDelivery) {
		deliveryService.assignDeliveryBoy(assignDelivery.getUserId(), assignDelivery.getOrderId());
		deliveryService.updateStatus(assignDelivery.getOrderId(), "DELIVERY_ASSIGNED");
		return new ResponseEntity<>(new ResponseDto<>("success", "Order Assigned Successfully!!"), HttpStatus.OK);
	}
}
