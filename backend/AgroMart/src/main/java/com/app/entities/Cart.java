package com.app.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cart")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "quantity")
	private int quantity;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "stock_id",nullable = false)
	private Stock selectedStock;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id",nullable = false)
	private User currentUser;
	
	public Cart(int quantity, Stock selectedStock, User currentUser) {
		super();
		this.quantity = quantity;
		this.selectedStock = selectedStock;
		this.currentUser = currentUser;
	}
}
