package com.app.dto;

import java.util.List;

import com.app.entities.FertilizerOrder;
import com.app.entities.OrderDetails;
import com.app.entities.Payment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FertilizerOrderDto {

	private FertilizerOrder order;
	private List<OrderDetails> orderDetails;
	private Payment payment;

	public FertilizerOrderDto(FertilizerOrder order, Payment payment) {
		super();
		this.order = order;
		this.payment = payment;
	}
}
