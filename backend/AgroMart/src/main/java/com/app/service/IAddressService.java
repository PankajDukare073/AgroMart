package com.app.service;

import java.util.List;

import com.app.entities.Address;

public interface IAddressService {

	Address addAddress(Address address, int userId);

	Address editAddress(Address address, int addressId);

	String deleteAddress(int addressId);

	List<Address> getAllAddressesByUserId(int userId);

}
