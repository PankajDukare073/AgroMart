package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ResponseDto;
import com.app.dto.UserDetailsDto;
import com.app.entities.User;
import com.app.service.UserServiceImpl;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserServiceImpl userService;

	@PutMapping("/update/{userId}")
	public ResponseEntity<?> updateProfile(@RequestBody UserDetailsDto user, @PathVariable int userId) {

		return ResponseEntity.ok().body(new ResponseDto<>("Success", userService.updateUserProfile(user, userId)));
	}

	@GetMapping("/getDetails/{userId}")
	public ResponseEntity<?> getDetails(@PathVariable int userId) {

		return ResponseEntity.ok().body(new ResponseDto<>("success", userService.getUserDetails(userId)));
	}

//	@PutMapping("/forgotPassword")
//	public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordDto forgetPassword) {
//
//		return ResponseEntity.ok().body(new ResponseDto<>("Success", userService.forgotPassword(forgetPassword)));
//	}
	
	//Code before JWT	
	@PostMapping("/signup")
	public ResponseEntity<?> SignUp(@RequestBody User user) {

		return ResponseEntity.ok().body(new ResponseDto<>("Success", userService.registerUser(user)));
	}

//	@PostMapping("/signin")
//	public ResponseEntity<?> SignIn(@RequestBody LoginRequestDto request) {
//		return ResponseEntity.ok().body(new ResponseDto<>("Success", userService.authenticateUser(request)));
//	}
}