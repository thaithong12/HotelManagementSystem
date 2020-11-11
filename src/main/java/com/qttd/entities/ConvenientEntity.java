package com.qttd.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "convenient")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class ConvenientEntity extends BaseEntity{
    @Column(name = "convenient_name")
    private String convenientName;
      
    @ManyToMany(mappedBy = "convenientEntities", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<CategoryEntity> category;
}
