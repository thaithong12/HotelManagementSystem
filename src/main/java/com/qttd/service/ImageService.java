package com.qttd.service;

import com.qttd.entities.ImageEntity;
import com.qttd.model.request.ImageRequestModel;
import com.qttd.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
public class ImageService {
    @Autowired
    ImageRepository imageRepository;

    public boolean deleteImage(ImageRequestModel imageRequestModel) {
        boolean check  = false;
        ImageEntity imageEntity = imageRepository.findById(imageRequestModel.getId()).get();
        if (!ObjectUtils.isEmpty(imageEntity)) {
            imageRepository.delete(imageEntity);
            check =true;
        }
        return check;
    }
}
