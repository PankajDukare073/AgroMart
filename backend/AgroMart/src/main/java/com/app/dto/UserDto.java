package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

	private int id;
	private String contact_no;
	private String email;
	private String name;
	private String password;
	private String role;
}
