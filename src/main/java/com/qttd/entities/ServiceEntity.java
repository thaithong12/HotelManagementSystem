package com.qttd.entities;

import com.qttd.enums.CommonStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "service")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class ServiceEntity extends BaseEntity {
	@Column(name = "service_name")
	private String serviceName;
	
	@Column(name = "unit_price")
	private double unitPrice;
	
	private int quantity;
	
	private String description;

	@Enumerated(EnumType.STRING)
	private CommonStatus status;
	
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "serviceEntity")
	List<ImageEntity> imageEntities;
	
	@ManyToMany
	@JoinTable(name = "service_order_relationship", 
		joinColumns = @JoinColumn(name = "service_id"), 
		inverseJoinColumns = @JoinColumn(name = "order_id"))
	List<OrderEntity> orderEntities;
}
