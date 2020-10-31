package com.qttd.api;

import com.qttd.config.JwtUtil;
import com.qttd.entities.AccountEntity;
import com.qttd.entities.AccountRoleEntity;
import com.qttd.entities.TokenEntity;
import com.qttd.enums.AccountRole;
import com.qttd.model.common.AccountModel;
import com.qttd.model.common.AccountPrincipal;
import com.qttd.service.AccountService;
import com.qttd.service.TokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class AuthAPIController {

    private Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    @Autowired
    private AccountService accountService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public AccountEntity register(@RequestBody AccountModel user){
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        AccountEntity entity = new AccountEntity();
        entity.setEmail(user.getEmail());
        entity.setPassword(passwordEncoder.encode(user.getPassword()));
        List<AccountRoleEntity> roleEntities = new ArrayList<>() ;

        AccountRoleEntity role = new AccountRoleEntity();
        role.setRole(AccountRole.ROLE_MANAGER);

        roleEntities.add(role);
        entity.setAccountRoles(roleEntities);

        return accountService.saveData(entity);
    }

    @Autowired
    private TokenService tokenService;

    @Autowired
    private JwtUtil jwtUtil;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AccountModel user){

        AccountPrincipal userPrincipal = accountService.findByEmail(user.getEmail());
        if (null == user || !user.getPassword().equals(userPrincipal.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("tài khoản hoặc mật khẩu không chính xác or chua kich hoat");
        }
        TokenEntity token = new TokenEntity();
        token.setToken(jwtUtil.generateToken(userPrincipal));
        token.setTokenExpDate(jwtUtil.generateExpirationDate());
        token.setCreatedBy(userPrincipal.getUserId());
        token.setAccountEntity(accountService.findOne(userPrincipal.getUserId()).get());
        tokenService.createToken(token);
        return ResponseEntity.ok(token.getToken());

    }
}
