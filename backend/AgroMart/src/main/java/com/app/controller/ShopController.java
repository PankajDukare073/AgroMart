package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ResponseDto;
import com.app.service.DeliveryServiceImpl;
import com.app.service.ShopServiceImpl;

@RestController
@RequestMapping("/shop")
public class ShopController 
{	
	@Autowired
	private ShopServiceImpl restoService;
	
	@Autowired
	private DeliveryServiceImpl deliveryService;
	
	@GetMapping("/allOrders/{shopId}")
	public ResponseEntity<?> getAllOrders(@PathVariable int shopId)
	{
		return new ResponseEntity<>(new ResponseDto<>("success",restoService.getAllPlacedOrders(shopId)),HttpStatus.OK);
				//ResponseEntity.ok(restoService.getAllPlacedOrders(restId));
	}
	
	@GetMapping("/allAcceptedOrders/{shopId}")
	public ResponseEntity<?> getAllAcceptedOrders(@PathVariable int shopId)
	{
		return new ResponseEntity<>(new ResponseDto<>("success",restoService.getAllAcceptedOrders(shopId)),HttpStatus.OK);
				//ResponseEntity.ok(restoService.getAllPlacedOrders(restId));
	}
	
	//@R
	@GetMapping("/allAcceptedOrdersPayment/{shopId}")
	public ResponseEntity<?> getAllAcceptedOrdersPayment(@PathVariable int shopId)
	{
		return new ResponseEntity<>(new ResponseDto<>("success",restoService.getAllAcceptedOrdersPayment(shopId)),HttpStatus.OK);
				//ResponseEntity.ok(restoService.getAllPlacedOrders(restId));
	}
	
	@PutMapping("/updateStatus/{orderId}/{status}")
	public ResponseEntity<?> updateStatus(@PathVariable String status , @PathVariable int orderId){
		
		return new ResponseEntity<>(new ResponseDto<>("success",deliveryService.updateStatus(orderId, status)),HttpStatus.OK);
	}
	
	
	
	@GetMapping("/allStockss/{shopId}")
	public ResponseEntity<?> getAllMenusRating(@PathVariable int shopId)
	{
		return ResponseEntity.ok(restoService.getAllStocks(shopId));
	}
	
}
