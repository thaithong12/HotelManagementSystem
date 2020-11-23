package com.qttd.repositories;

import com.qttd.entities.ReviewEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends CrudRepository<ReviewEntity, Long>{

}
