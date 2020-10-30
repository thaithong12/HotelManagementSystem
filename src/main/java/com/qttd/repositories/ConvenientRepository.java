package com.qttd.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.qttd.entities.ConvenientEntity;

import java.util.List;

@Repository
public interface ConvenientRepository extends CrudRepository<ConvenientEntity, Long>{
    public List<ConvenientEntity> findByConvenientName(String name);
}
