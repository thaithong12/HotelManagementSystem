package com.qttd.model.common;

import com.qttd.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountModel {
    private long id;
    private String email;
    private String password;
    private String customerName;
    private String phoneNumber;
    private String address;
    private String gender;
    private String country;
    private String avatar;
    private String jwttoken;
    private List<String> authorization;
}
