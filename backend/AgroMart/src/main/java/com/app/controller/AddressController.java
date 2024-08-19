package com.app.controller;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ResponseDto;
import com.app.entities.Address;
import com.app.service.AddressServiceImpl;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/address")
@Slf4j
public class AddressController {

	Logger logger = LoggerFactory.getLogger(AddressController.class);
	@Autowired
	private AddressServiceImpl addressService;

	// get all address with userId
	@GetMapping("/show/{id}")
	public ResponseEntity<?> gatAllAddress(@PathVariable int id) {
		return ResponseEntity.ok().body(new ResponseDto<>("Success", addressService.getAllAddressesByUserId(id)));
	}

	// adding address with userId
	@PostMapping("/add/{id}")
	public ResponseEntity<?> AddAddress(@RequestBody Address address, @PathVariable int id) {
		return ResponseEntity.status(HttpStatus.CREATED).body(addressService.addAddress(address, id));
	}

	// editing address with userId
	@PutMapping("/edit/{addressId}")
	public ResponseEntity<?> editAddress(@RequestBody Address address, @PathVariable int addressId) {
		Address address1 = addressService.editAddress(address, addressId);
		return new ResponseEntity<>(new ResponseDto<Address>("success", address1), HttpStatus.CREATED);
	}

	// deleting address with userId
	@DeleteMapping("/{id}")
	public ResponseEntity<?> DeleteAddress(@PathVariable int id) {
		return ResponseEntity.ok(addressService.deleteAddress(id));
	}
}