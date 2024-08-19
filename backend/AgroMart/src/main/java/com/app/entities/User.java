package com.app.entities;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(length = 50, name = "name")
	private String name;
	
	@Column(unique = true, length = 30, name = "email")
	private String email;
	
	@Column(name = "contact_no", length = 13)
	private String contact;
	
	@Column(name = "password")
	private String password;

	@Enumerated(EnumType.STRING)
	@Column(length = 20, name = "role")
	private Role role;

	@Enumerated(EnumType.STRING)
	@Column(length = 20, name = "status")
	private Status status;

	
	
	
	//For Jwt 
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getUsername() {
		return this.email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	private static final long serialVersionUID = 1L;




	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}
}