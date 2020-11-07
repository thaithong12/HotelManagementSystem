package com.qttd.service;

import com.qttd.entities.AccountRoleEntity;
import com.qttd.enums.AccountRole;
import com.qttd.repositories.AccountRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountRoleService {
    @Autowired
    private AccountRoleRepository accountRoleRepository;

    public AccountRoleEntity findByRole(AccountRole role) {
        return accountRoleRepository.findByRole(role);
    }
}
