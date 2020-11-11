package com.qttd.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "promotion")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class PromotionEntity extends BaseEntity {
	private double discount;
	
	private String description;
	
	@Column(name = "s_date")

	@DateTimeFormat(pattern = "yyyy-mm-dd")
	private Date sDate;
	
	@Column(name = "e_date")
	@DateTimeFormat(pattern = "yyyy-mm-dd")

	private Date eDate;
	
	private String code; 
	
	private String image;
	
	@OneToMany(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, mappedBy = "promotionEntity" )
	private List<OrderEntity> orderEntities;
}
