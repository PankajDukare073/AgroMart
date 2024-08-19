package com.app.dto;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDto<T> {

	private String status;
	private T data;

	public static ResponseEntity<?> success(Object data) {
		Map<String, Object> map = new HashMap<>();
		map.put("status", "success");
		if (data != null)
			map.put("data", data);
		return ResponseEntity.ok(map);
	}

	public static ResponseEntity<?> error(Object err) {
		Map<String, Object> map = new HashMap<>();
		map.put("status", "error");
		if (err != null)
			map.put("error", err);
		return ResponseEntity.ok(map);
	}
}
