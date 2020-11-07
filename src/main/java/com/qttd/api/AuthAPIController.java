package com.qttd.api;

import com.qttd.config.JwtUtil;
import com.qttd.entities.AccountEntity;
import com.qttd.entities.AccountRoleEntity;
import com.qttd.entities.TokenEntity;
import com.qttd.enums.AccountRole;
import com.qttd.enums.AccountStatus;
import com.qttd.enums.Gender;
import com.qttd.model.common.AccountModel;
import com.qttd.model.common.AccountPrincipal;
import com.qttd.service.AccountRoleService;
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
import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class AuthAPIController {
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

    @Autowired
    private AccountRoleService accountRoleService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AccountModel user){
        AccountEntity checkExist = accountService.findAll().stream()
                .filter(item -> user.getEmail().toLowerCase().equals(item.getEmail().toLowerCase()))
                .findFirst().orElse(null);
        if (null != checkExist) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        AccountEntity entity = new AccountEntity();

        // set info
        entity.setEmail(user.getEmail());
        entity.setPassword(passwordEncoder.encode(user.getPassword()));
        entity.setStatus(AccountStatus.UNACTIVE);
        entity.setPhoneNumber(user.getPhoneNumber());
        entity.setCustomerName(user.getCustomerName());
        // set role
        List<AccountRoleEntity> roleEntities = new ArrayList<>() ;
        AccountRoleEntity role = accountRoleService.findByRole(AccountRole.ROLE_USER);
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
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ac);
    }

    @GetMapping("/confirm-account")
    public ResponseEntity<?> activeAccount(@RequestParam String token){
        AccountEntity ac = null;
        if (!StringUtils.isEmpty(token)) {
            ac = tokenService.findByToken(token).getAccountEntity();
            if (!ObjectUtils.isEmpty(ac)) {
                Date cur = new Date();
                Date last = tokenService.findByToken(token).getCreatedAt();
                if ((cur.getTime() - last.getTime()) > 0 ) {
                    String tk = tokenService.TokenAcitveAccount(ac).getToken();

                    SimpleMailMessage mailMessage = new SimpleMailMessage();
                    mailMessage.setTo(ac.getEmail());
                    mailMessage.setSubject("Complete Registration!");
                    mailMessage.setText("To confirm your account, please click here : "
                            + "http://localhost/api/confirm-account?token="+ tk);
                    sender.send(mailMessage);

                    return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
                }
                ac.setStatus(AccountStatus.ACTIVE);
                accountService.saveData(ac);
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(ac);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AccountModel user){

        AccountPrincipal userPrincipal = accountService.getAccountPricipalByEmail(user.getEmail());
        if (null == user || !passwordEncoder.matches(user.getPassword(), userPrincipal.getPassword())
        || userPrincipal.getStatus().equals(AccountStatus.UNACTIVE)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("tài khoản hoặc mật khẩu không chính xác or chua kich hoat");
        }

        TokenEntity token = tokenService.findAll().stream()
                .filter(item -> item.getAccountEntity().getEmail().equals(user.getEmail()))
                .findFirst().orElse(null);
        Date curDate = new Date();
        if (null == token ||token.getTokenExpDate().after(curDate)) token = new TokenEntity();
        token.setToken(jwtUtil.generateToken(userPrincipal));
        token.setTokenExpDate(jwtUtil.generateExpirationDate());
        token.setAccountEntity(accountService.findOne(userPrincipal.getUserId()).get());
        tokenService.createToken(token);

        AccountModel ac = new AccountModel();
        ac.setEmail(user.getEmail());
        ac.setAddress(user.getAddress());
        ac.setCountry(user.getCountry());
        ac.setCustomerName(user.getCustomerName());
        ac.setJwttoken(token.getToken());
        ac.setAuthorization(user.getAuthorization());
        return ResponseEntity.status(HttpStatus.OK).body(ac);
    }
}
