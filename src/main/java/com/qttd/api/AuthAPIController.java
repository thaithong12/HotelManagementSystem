package com.qttd.api;

import com.qttd.config.JwtUtil;
import com.qttd.entities.AccountEntity;
import com.qttd.entities.AccountRoleEntity;
import com.qttd.entities.TokenEntity;
import com.qttd.enums.AccountRole;
import com.qttd.enums.AccountStatus;
import com.qttd.model.common.AccountModel;
import com.qttd.model.common.AccountPrincipal;
import com.qttd.service.AccountRoleService;
import com.qttd.service.AccountService;
import com.qttd.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

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
        try {
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
            accountService.saveData(entity);
            // create token active account
            // send email
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(entity.getEmail());
            mailMessage.setSubject("Complete Registration!");
            mailMessage.setText("To confirm your account, please click here : "
                    + "http://localhost/api/confirm-account?token="
                    + tokenService.TokenAcitveAccount(accountService.findByEmail(user.getEmail())).getToken());

            sender.send(mailMessage);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/confirm-account")
    public String activeAccount(@RequestParam String token){
        AccountEntity ac = null;
        if (!StringUtils.isEmpty(token)) {
            TokenEntity tkEntity = tokenService.findByToken(token);
            if (!ObjectUtils.isEmpty(tkEntity)) ac = tkEntity.getAccountEntity();
            if (!ObjectUtils.isEmpty(ac)) {
                Date cur = new Date();
                Date last = tokenService.findByToken(token).getCreatedAt();
                if (getDateDiff(last,cur,TimeUnit.DAYS) > 7) {
                    tokenService.removeToken(tkEntity);
                    String tk = tokenService.TokenAcitveAccount(ac).getToken();

                    SimpleMailMessage mailMessage = new SimpleMailMessage();
                    mailMessage.setTo(ac.getEmail());
                    mailMessage.setSubject("Re-Send Token!");
                    mailMessage.setText("To confirm your account, please click here : "
                            + "http://localhost/api/confirm-account?token="+ tk);
                    sender.send(mailMessage);
                    return "RE-SENDMAIL";
//                    return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
                }
                ac.setStatus(AccountStatus.ACTIVE);
                accountService.saveData(ac);
            }
            else return "ERROR";
        }
        return "OK";
//        return ResponseEntity.status(HttpStatus.OK).body(ac);
    }

    @PostMapping("/login")
    @Transactional
    public ResponseEntity<?> login(@RequestBody AccountModel user){

        AccountPrincipal userPrincipal = accountService.getAccountPricipalByEmail(user.getEmail());
        if (null == user || !passwordEncoder.matches(user.getPassword(), userPrincipal.getPassword())
        || userPrincipal.getStatus().equals(AccountStatus.UNACTIVE)) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(null);
        }
        AccountEntity acOnDB = accountService.findOne(userPrincipal.getUserId()).get();
        TokenEntity token = tokenService.findByAccountEntity(acOnDB);
        Date curDate = new Date();

        if (null == token ) token = new TokenEntity();
        if (getDateDiff(token.getTokenExpDate(),curDate,TimeUnit.DAYS) > 7) {
            tokenService.removeToken(token);
            token = new TokenEntity();
        }
        token.setToken(jwtUtil.generateToken(userPrincipal));
        token.setTokenExpDate(jwtUtil.generateExpirationDate());
        token.setAccountEntity(acOnDB);
        tokenService.createToken(token);

        AccountModel ac = new AccountModel();
        ac.setEmail(acOnDB.getEmail());
        ac.setAddress(acOnDB.getAddress());
        ac.setCountry(acOnDB.getCountry());
        ac.setCustomerName(acOnDB.getCustomerName());
        ac.setJwttoken(token.getToken());
        List<String> roles = new ArrayList<>();
        acOnDB.getAccountRoles().forEach(item -> {
            roles.add(item.getRole().toString());
        });
        ac.setAuthorization(roles);
        return ResponseEntity.status(HttpStatus.OK).body(ac);
    }

    public long getDateDiff(Date date1, Date date2, TimeUnit timeUnit) {
        long diffInMillies = date2.getTime() - date1.getTime();
        return timeUnit.convert(diffInMillies,TimeUnit.MILLISECONDS);
    }

    @PostMapping("/isAdmin")
    public boolean isAdmin(@RequestBody String token) {
        boolean check = false;

        AccountPrincipal user = null;
        if (StringUtils.hasText(token)) {
            user = jwtUtil.getUserFromToken(token);
            if (!ObjectUtils.isEmpty(user) && user.getAuthorities().contains("ROLE_ADMIN"))
                check = true;
        }
        return check;
    }
}
