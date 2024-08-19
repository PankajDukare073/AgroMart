package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.CategoryRepository;
import com.app.dao.StockRepository;
import com.app.dao.UserRepository;
import com.app.dto.StockDto;
import com.app.entities.Category;
import com.app.entities.Stock;
import com.app.entities.Type;

@Service
@Transactional
public class StockServiceImpl implements IStockService {

	@Autowired
	StockRepository stockRepo;

	@Autowired
	ImageServiceImpl imageService;

	@Autowired
	CategoryRepository catRepo;
	
	@Autowired
	UserRepository userRepository;

	@Override
	public Stock addStock(Stock stock, MultipartFile imageName) {
		String image = imageService.store(imageName);
		stock.setImage(image);

		return stockRepo.save(stock);
	}

	@Override
	public Stock editStock(StockDto stockDto, int id) {
		Stock menu = getMenuDetails(id);
		menu.setDescription(stockDto.getDescription());
		menu.setPrice(stockDto.getPrice());
		menu.setStatus(stockDto.getStatus());
		return stockRepo.save(menu);
	}

	public Stock getMenuDetails(int id) {
		return stockRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Menu Not Found !!!"));
	}

	@Override
	public String deleteStock(int id) {
		stockRepo.deleteById(id);
		return "Menu Deleted successfully";
	}

	@Override
	public List<Stock> findAll() {

		return stockRepo.findAllByStatus();
		

	}

	@Override
	public List<Stock> findByCategory(int id) {
		Category cat = catRepo.findById(id).get();
		List<Stock> menulist = stockRepo.getStockList(cat);
		return menulist;
	}

	@Override
	public List<Stock> findByShop(int id) {

		List<Stock> menulist = stockRepo.findAllByShop(id);
		return menulist;
	}

	@Override
	public List<Stock> findByType(String type) {
		List<Stock> stocklist = stockRepo.getStockListByType(Type.valueOf(type));
		return stocklist;
	}

	
}
