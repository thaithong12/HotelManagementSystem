package com.qttd.service;

import com.qttd.entities.AccountEntity;
import com.qttd.entities.TokenEntity;
import com.qttd.repositories.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class TokenService {
    @Autowired
    private TokenRepository tokenRepository;

    public TokenEntity createToken(TokenEntity token){
        return tokenRepository.save(token);
    }

    public TokenEntity findByToken(String token) {
        return tokenRepository.findByToken(token);
    }

    public TokenEntity TokenAcitveAccount(AccountEntity ac) {
        TokenEntity tokenEntity =new TokenEntity();
        tokenEntity.setTokenExpDate(generateExpirationDate());
        tokenEntity.setToken(UUID.randomUUID().toString());
        tokenEntity.setAccountEntity(ac);
        return tokenRepository.save(tokenEntity);
    }

    public List<TokenEntity> findAll() {
        return (List<TokenEntity>) tokenRepository.findAll();
    }

    public void removeToken(TokenEntity tk) {
        tokenRepository.delete(tk);
    }

    public TokenEntity findByAccountEntity(AccountEntity ac){
        return tokenRepository.findByAccountEntity(ac);
    }

    private Date generateExpirationDate() {
        return new Date(System.currentTimeMillis() + 864000000);
    }
}
