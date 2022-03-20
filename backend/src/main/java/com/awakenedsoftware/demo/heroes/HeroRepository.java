package com.awakenedsoftware.demo.heroes;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;

public interface HeroRepository extends R2dbcRepository<Hero, Long> {
    @Query("SELECT * from heroes WHERE name like '%' || :name || '%'")
    Flux<Hero> findByName(String name);
}