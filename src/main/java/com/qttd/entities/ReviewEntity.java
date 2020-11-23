package com.qttd.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "review")
@Data
@EqualsAndHashCode (callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class ReviewEntity extends BaseEntity{
	private int rate;
	
	private String content;
	
	@ManyToOne
	@JoinColumn(name = "category_id")
	private CategoryEntity categoryEntity;
	
	@ManyToOne
	@JoinColumn(name = "account_id")
	private AccountEntity accountEntity;
	
}
