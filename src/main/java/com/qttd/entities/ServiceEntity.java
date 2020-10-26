package com.qttd.entities;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "service")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class ServiceEntity extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "service_id")
	private int serviceId;
	
	@Column(name = "unit_price")
	private double unitPrice;
	
	private int quantity;
	
	private String description;
	
	private boolean status;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "serviceEntity")
	List<ImageEntity> imageEntities;
	
	@ManyToMany
	@JoinTable(name = "service_order_relationship", 
		joinColumns = @JoinColumn(name = "service_id"), 
		inverseJoinColumns = @JoinColumn(name = "order_id"))
	List<OrderEntity> orderEntities;
}
