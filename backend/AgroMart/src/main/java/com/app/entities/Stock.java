package com.app.entities;

import java.util.Objects;

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
@Table(name = "Stock")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Stock
{	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "product_name" ,length =20)
	private String productName;
	
	@Column(length =100,name = "description")
	private String description;
	
	@Column(name = "price")
	private double price;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 20, name = "type")
	private Type type;
	
	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	@Column(length =100,name = "image")
	private String image;
	
	@Column(name="status")
	private byte status;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "User_id",nullable= true)
	private User shop;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "cat_id",nullable=true)
	private Category category;

	
	@Override
	public boolean equals(Object o) {
	    if (this == o) return true;
	    if (o == null || getClass() != o.getClass()) return false;
	    Stock stock = (Stock) o;
	    return Double.compare(stock.price, price) == 0 &&
	           status == stock.status &&
	           Objects.equals(id, stock.id) &&
	           Objects.equals(productName, stock.productName) &&
	           Objects.equals(description, stock.description) &&
	           type == stock.type &&
	           Objects.equals(image, stock.image) &&
	           Objects.equals(shop, stock.shop) &&
	           Objects.equals(category, stock.category);
	}

	@Override
	public int hashCode() {
	    return Objects.hash(id, productName, description, price, type, image, status, shop, category);
	}
}