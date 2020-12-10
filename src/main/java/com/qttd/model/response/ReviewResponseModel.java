package com.qttd.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponseModel {
    private long id;

    private String accountName;

    private int rate;

    private String content;
}
