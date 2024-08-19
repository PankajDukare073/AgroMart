package com.app.entities;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "fertilizer_order")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FertilizerOrder {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "total_price")
	private double totalPrice;

	@Enumerated(EnumType.STRING)
	@Column(length = 25, name = "status")	
	private OrderStatus status;

	@DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
	@Column(name = "order_time")
	private LocalDateTime orderTime;

	@DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
	@Column(name = "delivered_time")
	private LocalDateTime deliveredTime;

	@DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
	@Column(name = "status_update_date")
	private LocalDateTime statusUpdateDate;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "farmer_id", nullable = false)
	private User farmer;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "deliveryboy_id", nullable = true)
	private User deliverboy;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "address_id", nullable = false)
	private Address address;

	public FertilizerOrder(double totalPrice, OrderStatus status, LocalDateTime orderTime, LocalDateTime deliveredTime,
			User farmer, User deliverboy, Address address) {
		super();
		this.totalPrice = totalPrice;
		this.status = status;
		this.orderTime = orderTime;
		this.deliveredTime = deliveredTime;
		this.farmer = farmer;
		this.deliverboy = deliverboy;
		this.address = address;
	}
}
