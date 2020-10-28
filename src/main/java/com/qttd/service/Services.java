package com.qttd.service;

import com.qttd.entities.ServiceEntity;
import com.qttd.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Services {

    @Autowired
    private ServiceRepository serviceRepository;

    public List<ServiceEntity> getAllServices() {
        return (List<ServiceEntity>) serviceRepository.findAll();
    }

    public void deleteData(ServiceEntity convenientEntity) {
        serviceRepository.delete(convenientEntity);
    }

    public List<ServiceEntity> findByNameService(String name ) {
        return serviceRepository.findByServiceName(name);
    }

    public void saveData(ServiceEntity entity) {
        serviceRepository.save(entity);
    }

    public void saveAllData(List<ServiceEntity> entities) {
        serviceRepository.saveAll(entities);
    }
}
