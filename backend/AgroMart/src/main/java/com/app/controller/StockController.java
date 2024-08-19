package com.app.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.CategoryRepository;
import com.app.dto.AddStockDto;
import com.app.dto.StockDto;
import com.app.dto.ResponseDto;
import com.app.entities.Stock;
import com.app.service.IUserService;
import com.app.service.ImageServiceImpl;
import com.app.service.StockServiceImpl;

@RestController
@RequestMapping("/stock")
public class StockController 
{
	@Autowired
	private StockServiceImpl stockService;
	
	@Autowired
	private ImageServiceImpl imageService;
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private CategoryRepository catRepo;
	
	@PostMapping("/add")
	public ResponseEntity<?> save( AddStockDto dto)
	{
		System.out.println(dto);
		Stock stock=AddStockDto.toEntity(dto);
		stock.setShop(userService.getUserDetails(dto.getShop()));
		stock.setCategory(catRepo.findById(dto.getCatagory()).get());
		
		stock = stockService.addStock(stock,dto.getImageName());
		
		return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseDto<>("Success" ,stock ));
	}
	
	@PutMapping("/edit/{id}")
	public ResponseEntity<?> editMenu(@RequestBody StockDto stockDto , @PathVariable int id){
		System.out.println(stockDto);
		Stock stock = stockService.editStock(stockDto , id);
		
		return ResponseEntity.ok().body(new ResponseDto<>("Success" ,stock ));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteStock(@PathVariable int id){
		String message = stockService.deleteStock(id);
		return new ResponseEntity<>(new ResponseDto<>("success", message),HttpStatus.CREATED);
	}
	
	@GetMapping("/allStocks")
	public ResponseEntity<?> findAllStock() 
	{
		List<Stock> list = stockService.findAll();
		return ResponseDto.success(list);
	}
	
	//get image
	@PostMapping(value="/image/{stockId}",produces ="image/*")
	public void downloadImage( @PathVariable int stockId ,HttpServletResponse resp) throws IOException
	{
		System.out.println("in downlaod img "+stockId);
		Resource resource = imageService.load(stockId);
		FileCopyUtils.copy(resource.getInputStream(), resp.getOutputStream());
	}
	
	@GetMapping("/allStockByType/{id}")
	public ResponseEntity<?> menuByType(@PathVariable int id){
	
		List<Stock> stock = stockService.findByCategory(id);
		return ResponseEntity.ok().body(new ResponseDto<List<Stock>>("success", stock));		
	}
	
	
	@GetMapping("/allStockByTypeVnV2/{type}")
	public ResponseEntity<?> menuByTypeVnV(@PathVariable String type){
		
		List<Stock> stock = stockService.findByType(type);
		return ResponseEntity.ok().body(new ResponseDto<List<Stock>>("success", stock));
	}
	
	@GetMapping("/allStockByTypeVnV/{id}")
	public ResponseEntity<?> menuByTypeVnV2(@PathVariable int id){
		String type = "SEED";
		if(id==2) {
			type = "";
		}
		List<Stock> stock = stockService.findByType(type);
		return ResponseEntity.ok().body(new ResponseDto<List<Stock>>("success", stock));
	}
	
	@GetMapping("/allStockOfShop/{shopId}")
	public ResponseEntity<?> stockByShop(@PathVariable int shopId){
		System.out.println(shopId);
		List<Stock> stock = stockService.findByShop(shopId);
		return ResponseEntity.ok().body(new ResponseDto<List<Stock>>("success", stock));		
	}
	
	@GetMapping("/getById/{stockId}")
	public ResponseEntity<?> getStockById(@PathVariable int stockId){
		
		Stock stock = stockService.getMenuDetails(stockId);
		return ResponseEntity.ok().body(new ResponseDto<Stock>("success", stock));
	}
}
