package com.qttd.repositories;

import com.qttd.entities.ServiceEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends CrudRepository<ServiceEntity, Long> {
    List<ServiceEntity> findByServiceName(String name);
}
