package com.qttd.service;

import com.qttd.entities.TokenEntity;
import com.qttd.repositories.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
