package com.qttd.service;

import com.qttd.entities.TokenEntity;
import com.qttd.repositories.TokenRepository;
import org.springframework.stereotype.Service;

@Service
public class TokenService {
    private TokenRepository tokenRepository;

    public TokenEntity createToken(TokenEntity token){
        return tokenRepository.save(token);
    }
}
