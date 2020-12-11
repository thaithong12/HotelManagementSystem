package com.qttd.api;

import com.qttd.model.common.ResponseModel;
import com.qttd.model.request.ReviewRequestModel;
import com.qttd.model.response.ListReviewResponseModel;
import com.qttd.model.response.ReviewResponseModel;
import com.qttd.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @PostMapping("/reviews")
    public ResponseEntity<?> getReviewInCategory( @RequestBody ReviewRequestModel requestModel) {
        ResponseModel<ListReviewResponseModel> responseModel = reviewService.getReviewInCategory(requestModel);
        return ResponseEntity.ok(responseModel);
    }

    @PostMapping("/reviews/add")
    public ResponseEntity<?> addReviewInCategory(@RequestBody ReviewRequestModel requestModel) {
        ResponseModel<ReviewResponseModel> responseModel = reviewService.addReviewInCategory(requestModel);
        return ResponseEntity.ok(responseModel);
    }

    @DeleteMapping("/reviews")
    public ResponseEntity<?> deleteReviewInCategory(@RequestBody ReviewRequestModel requestModel) {
        ResponseModel<ReviewResponseModel> responseModel = reviewService.deleteReviewInCategory(requestModel);
        return ResponseEntity.ok(responseModel);
    }
}
