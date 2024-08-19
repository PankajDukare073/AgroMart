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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "payment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment  {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "ammount")
	private double ammount;
	
	@Enumerated(EnumType.STRING)
	
	@Column(name = "payment_status", length=25)
	private PaymentStatus paymentStatus;
	
	@DateTimeFormat(pattern="yyyy-MM-dd hh:mm:ss")
	@Column(name="order_dateTime")
	private LocalDateTime orderDate;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "payment_mode", length=20)
	private PaymentModes payment_mode;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "fertilizerorder_id",nullable = false)
	private FertilizerOrder currentOrder;

	public Payment(double ammount, PaymentStatus paymentStatus, LocalDateTime orderDate, PaymentModes payment_mode,
			FertilizerOrder currentOrder) {
		super();
		this.ammount = ammount;
		this.paymentStatus = paymentStatus;
		this.orderDate = orderDate;
		this.payment_mode = payment_mode;
		this.currentOrder = currentOrder;
	}
}
