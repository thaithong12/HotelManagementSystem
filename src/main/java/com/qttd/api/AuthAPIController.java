package com.qttd.api;

import com.qttd.config.JwtUtil;
import com.qttd.entities.AccountEntity;
import com.qttd.entities.AccountRoleEntity;
import com.qttd.entities.TokenEntity;
import com.qttd.enums.AccountRole;
import com.qttd.enums.AccountStatus;
import com.qttd.model.common.AccountModel;
import com.qttd.model.common.AccountPrincipal;
import com.qttd.service.AccountService;
import com.qttd.service.TokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class AuthAPIController {

    private Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    @Autowired
    private AccountService accountService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JavaMailSender sender;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public AccountEntity register(@RequestBody AccountModel user){
        AccountEntity entity = new AccountEntity();

        // set info
        entity.setEmail(user.getEmail());
        entity.setPassword(passwordEncoder.encode(user.getPassword()));

        // set role
        List<AccountRoleEntity> roleEntities = new ArrayList<>() ;
        AccountRoleEntity role = new AccountRoleEntity();
        role.setRole(AccountRole.ROLE_USER);
        roleEntities.add(role);
        entity.setAccountRoles(roleEntities);

        AccountEntity ac = accountService.saveData(entity);

        // create token active account
        // send email
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(entity.getEmail());
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setText("To confirm your account, please click here : "
                + "http://localhost/api/confirm-account?token="
                + tokenService.TokenAcitveAccount(ac).getToken());

        sender.send(mailMessage);
        return ac;
    }

    @GetMapping("/confirm-account")
    public ResponseEntity<?> activeAccount(@RequestParam String token){
        if (!StringUtils.isEmpty(token)) {
            AccountEntity ac = tokenService.findByToken(token).getAccountEntity();
            if (!ObjectUtils.isEmpty(ac)) {
                ac.setStatus(AccountStatus.ACTIVE);
                accountService.saveData(ac);
            }
        }
        return ResponseEntity.ok("Active Account");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AccountModel user){

        AccountPrincipal userPrincipal = accountService.findByEmail(user.getEmail());
        if (null == user || !passwordEncoder.matches(user.getPassword(), userPrincipal.getPassword())
        || userPrincipal.getStatus().equals(AccountStatus.BLOCK)) {
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
