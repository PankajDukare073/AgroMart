package com.app.controller;

import java.io.IOException;
import java.nio.file.Files;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ImageController {

    // Endpoint to serve images
    @GetMapping("/images/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException {
        
        ClassPathResource imgFile = new ClassPathResource("static/images/" + imageName);

        if (imgFile.exists()) {
            
            byte[] bytes = Files.readAllBytes(imgFile.getFile().toPath());
            
            MediaType mediaType = MediaType.IMAGE_JPEG; 

            return ResponseEntity.ok().contentType(mediaType).body(bytes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
