package com.app.dto;

import org.springframework.web.multipart.MultipartFile;

import com.app.entities.Stock;
import com.app.entities.Type;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddStockDto {
	
	private String stockName;
	private double price;
	private String description;
	private MultipartFile imageName;
	private int shop;
	private int catagory;
	private Byte status;
	private String type;

	public static Stock toEntity(AddStockDto dto) {
		Stock entity = new Stock();
		entity.setProductName(dto.stockName);
		entity.setDescription(dto.description);
		entity.setPrice(dto.price);
		entity.setStatus((byte) 1);
		entity.setType(Type.valueOf(dto.type));
		return entity;
	}
}