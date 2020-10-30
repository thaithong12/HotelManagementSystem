package com.qttd.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "token")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenEntity extends BaseEntity {
    @Column(length = 1000)
    private String token;

    private Date tokenExpDate;

    @OneToOne(targetEntity = AccountEntity.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "account_id")
    private AccountEntity accountEntity;

}
