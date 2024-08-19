package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.UserRepository;
import com.app.dto.LoginRequestDto;
import com.app.dto.UserDetailsDto;
import com.app.entities.Status;
import com.app.entities.User;

@Service
@Transactional
public class UserServiceImpl implements IUserService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PasswordEncoder encoder;

	// Update User Details
	@Override
	public User updateUserProfile(UserDetailsDto userDto, int userId) {
		User user = userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid User !!! Can not update details"));
		//System.out.println(userDto);
		user.setContact(userDto.getContact_no());
		user.setEmail(userDto.getEmail());
		user.setName(userDto.getName());
		user.setPassword(encoder.encode(user.getPassword()));
		return user;
	}

	// Authenticate User
	@Override
	public User authenticateUser(LoginRequestDto loginRequest) {

		return userRepo.findByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Credentials !!"));
	}

	// Register User
	@Override
	public User registerUser(User user) {

		user.setPassword(encoder.encode(user.getPassword()));
		user.setStatus(Status.ACTIVE);
		return userRepo.save(user);
	}

	// Get User Details
	@Override
	public User getUserDetails(Integer id) {

		return userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User Not Found !!!"));
	}

//	@Override
//	public User forgotPassword(ForgotPasswordDto forgetPassword) {
//		User user = userRepo.findByEmail(forgetPassword.getEmail())
//				.orElseThrow(() -> new ResourceNotFoundException("Invalid User !!! Can not upadate details"));
//		user.setPassword(forgetPassword.getPassword());
//		;
//
//		return user;
//	}

	@Override
	public List<User> getAllFarmer() {

		return userRepo.findAllFARMER();
	}

	@Override
	public List<User> getAllDeliveryBoy() {

		return userRepo.findAllDeliveryBoy();
	}

	@Override
	public List<User> getAllShop() {

		return userRepo.findAllShop();
	}

	@Override
	public User getUserDetailsByEmail(String username) {
		return userRepo.findByEmail(username).orElseThrow(()->new RuntimeException("User Not Found"));
	}

	public User updateStatusOfUser(int id, int val) {
		
		User user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User Not Found !!!"));
		if (val==1) {
			user.setStatus(Status.INACTIVE);
		}
		else {
			user.setStatus(Status.ACTIVE);
		}
		return user;
	}

	@Override
	public List<User> getAllActiveShops() {
		return userRepo.findByActiveShop();
	}

	
}