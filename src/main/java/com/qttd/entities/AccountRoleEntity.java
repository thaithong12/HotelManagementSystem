package com.qttd.entities;

import com.qttd.enums.AccountRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

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
