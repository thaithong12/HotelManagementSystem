package com.qttd.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRequestModel {
    private long id ;

    private String token;

    private int rate;

	private String content;

	private long categoryId;
}
