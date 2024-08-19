package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

	Optional<Category> findById(Integer Id);

	@Query("select c from Category c order by c.id")
	List<Category> findAllAcending();

}
