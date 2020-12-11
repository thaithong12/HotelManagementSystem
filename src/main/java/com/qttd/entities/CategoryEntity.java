package com.qttd.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "room_category")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class CategoryEntity extends BaseEntity {
	@Column(name = "category_name")
	private String categoryName;

	@Column(name = "description")
	private String description;

	private Double price;

	@Column(name = "number_of_room")
	private int numberOfRoom;

	@Column(name = "maximum_people_of_room")
	private int maximumPeopleOfRoom;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "categoryEntity", fetch = FetchType.LAZY)
	private List<ImageEntity> imageEntities;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "categoryEntity", fetch = FetchType.LAZY)
	private List<RoomEntity> roomEntities;

	@ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
	@JoinTable(name = "category_convenient_relationship", 
		joinColumns = @JoinColumn(name = "category_id"), 
		inverseJoinColumns = @JoinColumn(name = "convenient_id"))
	private List<ConvenientEntity> convenientEntities;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "categoryEntity")
	private List<ReviewEntity> reviewEntities;

}
