package com.app.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockDto {
	
	private double price;
	private String description;
	private Byte status;
}