package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {

	@Query("Select a from Address a join fetch a.selectedUser where a.selectedUser.id=?1")
	List<Address> getAllAddressesByUserId(Integer Id);

	@Query("Select a from Address a where a.id=?1")
	Address findbyId(Integer addressId);
}
