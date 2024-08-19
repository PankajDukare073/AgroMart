package com.app.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface ImageHandlingService {

	String store(MultipartFile file);

	Resource load(int stockId);
}
