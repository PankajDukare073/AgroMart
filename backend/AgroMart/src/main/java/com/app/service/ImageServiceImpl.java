package com.app.service;

import java.io.File;
import java.io.FileOutputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.StockRepository;
import com.app.entities.Stock;

@Service
@Transactional
public class ImageServiceImpl implements ImageHandlingService {

	@Value("${file.upload.basepath}")
	private String BASEPATH;
	
	@Autowired
	StockRepository stockRepo;
	
	@Override
	public String store(MultipartFile file) {
		String fileName = file.getOriginalFilename();
		File filePath = new File(BASEPATH, fileName);
		try(FileOutputStream out = new FileOutputStream(filePath)) {
			FileCopyUtils.copy(file.getInputStream(), out);
			return fileName;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}	
	}

	@Override
	public Resource load(int stockId) 
	{
		Stock stock = stockRepo.findById(stockId).orElseThrow(() -> new ResourceNotFoundException("Invalid Stock Id"));
		if(stock.getImage() == null)
			throw new ResourceNotFoundException("Image doesn't exist");
		
		
		File filePath = new File(BASEPATH,stock.getImage());
		System.out.println("Loading file: " + filePath.getAbsolutePath());
		if(filePath.exists())
			return new FileSystemResource(filePath);
		
		return null;
	}


}
