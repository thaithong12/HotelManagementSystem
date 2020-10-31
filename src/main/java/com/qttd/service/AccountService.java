package com.qttd.service;

import com.qttd.entities.AccountEntity;
import com.qttd.enums.AccountStatus;
import com.qttd.model.common.AccountPrincipal;
import com.qttd.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public AccountEntity saveData(AccountEntity ac) {
        return accountRepository.save(ac);
    }

    public AccountStatus getStatusByEmail(String email) {
        AccountEntity ac = accountRepository.findByEmail(email);
        return ac.getStatus();
    }

    public AccountPrincipal findByEmail(String email) {
        AccountEntity ac = accountRepository.findByEmail(email);

        AccountPrincipal userPrincipal = new AccountPrincipal();
        if (null != ac) {
            Set<String> authorities = new HashSet<>();
            if (null != ac.getAccountRoles()) ac.getAccountRoles().forEach(r -> {
                authorities.add(r.getRole().toString());
            });

            userPrincipal.setUserId(ac.getId());
            userPrincipal.setUsername(ac.getEmail());
            userPrincipal.setPassword(ac.getPassword());
            userPrincipal.setAuthorities(authorities);
        }
        return userPrincipal;
    }

    public Optional<AccountEntity> findOne(long id) {
        return accountRepository.findById(id);
    }
}
