package com.awakenedsoftware.demo.heroes;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Value
@Builder
@Table("heroes")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Hero {
    @Id
    Long id;

    @With(AccessLevel.PACKAGE)
    String name;
}