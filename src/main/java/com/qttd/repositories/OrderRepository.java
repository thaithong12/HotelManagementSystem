package com.qttd.repositories;

import com.qttd.entities.AccountEntity;
import com.qttd.entities.OrderEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends CrudRepository<OrderEntity, Long> {
    List<OrderEntity> findByAccountEntity(AccountEntity accountEntity);
}
