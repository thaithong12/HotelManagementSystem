package com.qttd.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.qttd.entities.ConvenientEntity;

@Repository
public interface ConvenientRepository extends CrudRepository<ConvenientEntity, Integer>{

}
