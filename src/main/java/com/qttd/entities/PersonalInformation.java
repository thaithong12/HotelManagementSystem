package com.qttd.entities;

import com.qttd.enums.Gender;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
@Data
@EqualsAndHashCode(callSuper = true)
public abstract class PersonalInformation extends BaseEntity {
	@Column(name = "customer_name", length = 100)
	private String customerName;

	@Column(name = "phone_number", length = 100)
	private String phoneNumber;

	private String address;

	private String email;

	@Enumerated(EnumType.STRING)
	private Gender gender;
	
	private String country;
}
