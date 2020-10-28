package com.qttd.model.common;

import com.qttd.enums.ApiStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseModel<T> {

    private String message;

    private ApiStatus status;

    private T response;
}
