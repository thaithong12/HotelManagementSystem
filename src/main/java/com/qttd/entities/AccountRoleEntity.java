package com.qttd.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.qttd.enums.AccountRole;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "account_role")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountRoleEntity extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private AccountRole role = AccountRole.ROLE_USER;

    @ManyToMany(mappedBy = "accountRoles")
    private List<AccountEntity> accounts;

}
