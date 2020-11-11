package com.qttd.repositories;

import com.qttd.entities.AccountEntity;
import com.qttd.entities.TokenEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepository extends CrudRepository<TokenEntity, Long> {
    TokenEntity findByToken(String token);

    TokenEntity findByAccountEntity(AccountEntity ac);
}
