package com.qttd.entities;

import com.qttd.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class OrderEntity extends PersonalInformation {
	private Date checkIn;
	
	private Date checkOut;
	
	private double unitPrice;
	
	private double totalPrice;

	private boolean isDeleted;

	@Enumerated(EnumType.STRING)
	private OrderStatus orderStatus;
	
	@ManyToOne
	@JoinColumn(name = "room_id")
	private RoomEntity roomEntity;
	
	@ManyToOne
	@JoinColumn(name = "promotion_id")
	private PromotionEntity promotionEntity;
	
	@ManyToMany(mappedBy = "orderEntities", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<ServiceEntity> serviceEntities;
	
	@ManyToOne
	@JoinColumn(name = "account_id")
	private AccountEntity accountEntity;
	
}
