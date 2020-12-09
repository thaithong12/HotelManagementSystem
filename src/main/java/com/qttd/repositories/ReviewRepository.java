package com.qttd.repositories;

import com.qttd.entities.AccountEntity;
import com.qttd.entities.CategoryEntity;
import com.qttd.entities.ReviewEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends CrudRepository<ReviewEntity, Long>{
    List<ReviewEntity> findByCategoryEntity(CategoryEntity categoryEntity);

    List<ReviewEntity> findByAccountEntity(AccountEntity accountEntity);
}
