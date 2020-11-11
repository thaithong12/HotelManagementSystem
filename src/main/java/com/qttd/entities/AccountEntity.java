package com.qttd.entities;

import com.qttd.enums.AccountStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "account")
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class AccountEntity extends PersonalInformation{

	private String password;

	private String avatar;

	@Enumerated(EnumType.STRING)
	private AccountStatus status = AccountStatus.BLOCK;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "accountEntity")
	private List<ReviewEntity> reviewEntities;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "accountEntity")
	private List<OrderEntity> orderEntities;
	
	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.EAGER)
	@JoinTable(name = "acc_role_relationship", 
		joinColumns = @JoinColumn(name = "acc_id"), 
		inverseJoinColumns = @JoinColumn(name = "acc_role_id"))
	private List<AccountRoleEntity> accountRoles;

}
