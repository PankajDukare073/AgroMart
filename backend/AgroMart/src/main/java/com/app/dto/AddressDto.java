package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressDto {

	private int id;
	private String state;
	private String city;
	private String contact_no;
	private int pincode;
	private int user_id;
}
