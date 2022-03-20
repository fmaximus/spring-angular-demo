package com.awakenedsoftware.demo.heroes;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import static org.springframework.http.MediaType.APPLICATION_JSON;

@RestController
@RequestMapping("/api/heroes")
@CrossOrigin(origins="http://localhost:4200")
@RequiredArgsConstructor
public class HeroController {

    private final HeroRepository heroRepository;

    @GetMapping("/")
    public Flux<Hero> getHeroes(@RequestParam(name="name", required = false) String name) {
        if (name != null) {
            return this.heroRepository.findByName(name);
        } else {
            return this.heroRepository.findAll();
        }
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<Hero>> getHero(@PathVariable Long id) {
        return this.heroRepository.findById(id)
                .map(person -> ResponseEntity.ok().contentType(APPLICATION_JSON).body(person))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteHero(@PathVariable Long id) {
        return this.heroRepository.deleteById(id);
    }

    @PostMapping(path ="/", consumes = "application/json")
    public Mono<Hero> createHero(@RequestBody Hero hero) {
        return this.heroRepository.save(hero);
    }

    @PutMapping(path ="/{id}", consumes = "application/json")
    public Mono<ResponseEntity<Hero>> updateHero(@PathVariable Long id, @RequestBody Hero hero) {
        return this.heroRepository
                .findById(id)
                .map(dbHero -> dbHero.withName(hero.getName()))
                .flatMap(this.heroRepository::save)
                .map(person -> ResponseEntity.ok().contentType(APPLICATION_JSON).body(person))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
