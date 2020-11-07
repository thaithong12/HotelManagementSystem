package com.qttd.service;

import com.qttd.entities.AccountEntity;
import com.qttd.enums.AccountStatus;
import com.qttd.model.common.AccountPrincipal;
import com.qttd.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
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

    public AccountPrincipal getAccountPricipalByEmail(String email) {
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
            userPrincipal.setStatus(ac.getStatus());
        }
        return userPrincipal;
    }

    public AccountEntity findByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    public List<AccountEntity> findAll() {
        return (List<AccountEntity>) accountRepository.findAll();
    }

    public Optional<AccountEntity> findOne(long id) {
        return accountRepository.findById(id);
    }
}
