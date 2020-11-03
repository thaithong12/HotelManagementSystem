package com.qttd.repositories;

import com.qttd.entities.AccountEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends CrudRepository<AccountEntity, Long> {
    AccountEntity findByEmail(String email);
}
