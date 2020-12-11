package com.qttd.api;

import com.qttd.model.request.ImageRequestModel;
import com.qttd.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class UtilController {

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFiles(@RequestBody MultipartFile multipartFile[]) {
        String uploadRootPath = "hotel-fe/public/images";
        System.out.println("uploadRootPath=" + uploadRootPath);

        File uploadRootDir = new File(uploadRootPath);
        // Create Folder If not exist
        if (!uploadRootDir.exists()) {
            uploadRootDir.mkdirs();
        }
        
        MultipartFile[] fileDatas = multipartFile;

        List<File> uploadedFiles = new ArrayList<File>();
        List<String> failedFiles = new ArrayList<String>();
        List<String> fileNames = new ArrayList<String>();
        for (MultipartFile fileData : fileDatas) {

            // format name file
            Date date = new Date() ;
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss") ;
            // File Name in client
            String name = dateFormat.format(date) +  fileData.getOriginalFilename();
            System.out.println("Client File Name = " + name);

            if (name != null && name.length() > 0) {
                try {
                    // File Name in Server
                    File serverFile = new File(uploadRootDir.getAbsolutePath() + File.separator + name);

                    BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                    stream.write(fileData.getBytes());
                    stream.close();

                    uploadedFiles.add(serverFile);
                    fileNames.add(name);
                    System.out.println("Write file: " + serverFile);
                } catch (Exception e) {
                    System.out.println("Error Write file: " + name);
                    failedFiles.add(name);
                }
            }
        }
        if(failedFiles.size() > 0 ) {
            return new ResponseEntity<>(HttpStatus.PAYLOAD_TOO_LARGE);
        }
        return ResponseEntity.ok(fileNames);
    }

    @Autowired
    ImageService imageService;

    @DeleteMapping("/upload")
    public ResponseEntity<?> deleteFile(@RequestBody ImageRequestModel imageRequestModel){
        if (!ObjectUtils.isEmpty(imageRequestModel)) {
            boolean check = imageService.deleteImage(imageRequestModel);
            return ResponseEntity.ok(check);
        } else {
            return ResponseEntity.ok(false);
        }
    }
}
