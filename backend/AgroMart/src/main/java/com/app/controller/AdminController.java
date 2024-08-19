package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ResponseDto;
import com.app.service.UserServiceImpl;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private UserServiceImpl userService;

	// get all customers
	@GetMapping("/getAllFarmer")
	public ResponseEntity<?> getAllCustomer() {
		return ResponseEntity.ok().body(new ResponseDto<>("Success", userService.getAllFarmer()));
	}

	// get all deliveryBoys
	@GetMapping("/getAllDeliveryBoy")
	public ResponseEntity<?> getAllDeliveryBoy() {
		return ResponseEntity.ok().body(new ResponseDto<>("Success", userService.getAllDeliveryBoy()));
	}

	// get all restaurants 
	@GetMapping("/getAllShop")
	public ResponseEntity<?> getAllRestaurants() {
		return ResponseEntity.ok().body(new ResponseDto<>("Success", userService.getAllShop()));
	}
	
	@PutMapping("/changeStatus/{id}/{val}")
	public ResponseEntity<?> updateStatusOfUser(@PathVariable int id,@PathVariable int val) {
		return ResponseEntity.ok().body(new ResponseDto<>("Success", userService.updateStatusOfUser(id,val)));
	}
}