package com.app.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "order_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "quantity")
	private int quantity;
	
	@Column(name = "total_ammount")
	private double total;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "fertilizer_id", nullable = false)
	private FertilizerOrder currentOrder;
	

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "stock_id", nullable = false)
	private Stock selectedProduct;
	

	public OrderDetails(int quantity, double total, FertilizerOrder currentOrder, Stock selectedProduct) {
		super();
		this.quantity = quantity;
		this.total = total;
		this.currentOrder = currentOrder;
		this.selectedProduct = selectedProduct;
	}
}