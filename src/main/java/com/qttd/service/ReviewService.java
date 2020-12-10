package com.qttd.service;
import com.qttd.config.JwtUtil;
import com.qttd.entities.*;
import com.qttd.enums.AccountRole;
import com.qttd.enums.ApiStatus;
import com.qttd.model.common.AccountPrincipal;
import com.qttd.model.common.ResponseModel;
import com.qttd.model.request.ReviewRequestModel;
import com.qttd.model.response.ListReviewResponseModel;
import com.qttd.model.response.ReviewResponseModel;
import com.qttd.repositories.OrderRepository;
import com.qttd.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    CategoryService categoryService;

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    AccountService accountService;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    OrderRepository orderRepository;

    public ResponseModel<ListReviewResponseModel> getReviewInCategory(@RequestBody ReviewRequestModel requestModel) {
        ResponseModel<ListReviewResponseModel> responseModel = new ResponseModel<>();
        responseModel.setMessage("GET ALL REVIEW IN ROOM CATEGORY");
        CategoryEntity categoryEntity = categoryService.findById(requestModel.getCategoryId());
        if (!ObjectUtils.isEmpty(categoryEntity)) {
            List<ReviewEntity> reviewEntities = reviewRepository.findByCategoryEntity(categoryEntity);
            if (!CollectionUtils.isEmpty(reviewEntities) && (reviewEntities.size() > 0)) {
                ListReviewResponseModel listReviewResponseModel = new ListReviewResponseModel();
                List<ReviewResponseModel> listReturn = new ArrayList<>();
                ReviewResponseModel model;
                for (ReviewEntity r : reviewEntities ){
                    model = new ReviewResponseModel();
                    model.setId(r.getId());
                    model.setContent(r.getContent());
                    model.setRate(r.getRate());
                    model.setAccountName(r.getAccountEntity().getCustomerName());
                    listReturn.add(model);
                }
                listReviewResponseModel.setData(listReturn);
                responseModel.setStatus(ApiStatus.SUCCESS);
                responseModel.setResponse(listReviewResponseModel);
            } else {
                responseModel.setResponse(null);
                responseModel.setStatus(ApiStatus.ERROR);
            }
        }
        return responseModel;
    }

    public ResponseModel<ReviewResponseModel> addReviewInCategory (ReviewRequestModel requestModel) {
        ResponseModel<ReviewResponseModel> responseModel = new ResponseModel<>();
        responseModel.setMessage("ADD REVIEW");
        if (!ObjectUtils.isEmpty(requestModel)) {
            AccountPrincipal accountPrincipal = jwtUtil.getUserFromToken(requestModel.getToken());
            AccountEntity accountEntity = accountService.findOne(accountPrincipal.getUserId()).get();
            if (!ObjectUtils.isEmpty(accountEntity)
                    && accountEntity.getAccountRoles().size() > 0 ) {
                List<String> listErr = validatesModel(requestModel,accountEntity);
                if (listErr.isEmpty())  {
                    ReviewEntity reviewEntity = new ReviewEntity();
                    reviewEntity.setContent(requestModel.getContent());
                    reviewEntity.setRate(requestModel.getRate());
                    reviewEntity.setAccountEntity(accountEntity);
                    reviewEntity.setCategoryEntity(categoryService.findById(requestModel.getCategoryId()));
                    reviewRepository.save(reviewEntity);
                    responseModel.setStatus(ApiStatus.SUCCESS);
                } else {
                    responseModel.setStatus(ApiStatus.ERROR);
                }
            }

        }
        responseModel.setResponse(null);
        return responseModel;
    }

    private List<String> validatesModel(ReviewRequestModel requestModel, AccountEntity accountEntity) {
        List<String> listErr = new ArrayList<>();
        if ("".equals(requestModel.getContent())) listErr.add("content"); // check blank content
        if (requestModel.getRate() < 0 || requestModel.getRate() > 5) listErr.add("rate"); // check valid rate
        if (ObjectUtils.isEmpty(categoryService.findById(requestModel.getCategoryId()))) listErr.add("category"); // check valid cate

        // check limit 1 review each room category with account
        boolean check_user = false;
        for (AccountRoleEntity role : accountEntity.getAccountRoles())
            if (AccountRole.ROLE_USER.equals(role.getRole())) check_user = true;
        if (check_user) {
            CategoryEntity categoryEntity = categoryService.findById(requestModel.getCategoryId());
            List<ReviewEntity> reviewEntities = reviewRepository.findByCategoryEntity(categoryEntity);
            if (!CollectionUtils.isEmpty(reviewEntities) && reviewEntities.size() > 1){
                for (ReviewEntity r : reviewEntities) {
                    if (r.getAccountEntity().getId() == accountEntity.getId())
                        listErr.add("account");
                }
            }
            // check used to book this cate
            List<OrderEntity> orderEntities = orderRepository.findByAccountEntity(accountEntity);
            if (CollectionUtils.isEmpty(orderEntities)) listErr.add("order");
            else {
                int count = 0 ;
                for (OrderEntity o : orderEntities) {
                    if (o.getRoomEntity().getCategoryEntity().getId() == requestModel.getCategoryId())
                        count++;
                }
                if (count == 0 ) listErr.add("order");
            }
        }
        return listErr;
    }

    public ResponseModel<ReviewResponseModel> deleteReviewInCategory (ReviewRequestModel requestModel) {
        ResponseModel<ReviewResponseModel> responseModel = new ResponseModel<>();
        responseModel.setMessage("DELETE REVIEW");

        if (!ObjectUtils.isEmpty(requestModel)) {
            AccountPrincipal accountPrincipal = jwtUtil.getUserFromToken(requestModel.getToken());
            AccountEntity accountEntity = accountService.findOne(accountPrincipal.getUserId()).get();

            boolean check_admin = false;
            for (AccountRoleEntity role : accountEntity.getAccountRoles())
                if (AccountRole.ROLE_ADMIN.equals(role.getRole())) check_admin = true;
            if (check_admin) {
                ReviewEntity entity = reviewRepository.findById(requestModel.getId()).get();
                if (!ObjectUtils.isEmpty(entity)){
                    reviewRepository.delete(entity);
                    responseModel.setStatus(ApiStatus.SUCCESS);
                }
            } else responseModel.setStatus(ApiStatus.ERROR);
        }
        return responseModel;
    }

}
