package com.awakenedsoftware.demo.heroes;

import com.awakenedsoftware.demo.WebSecurityConfig;
import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.webtestclient.WebTestClientRestDocumentation.document;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf;

@WebFluxTest(HeroController.class)
@AutoConfigureRestDocs(outputDir = "build/snippets")
public class HeroControllerTest {
    public static final Hero hero_1 = Hero.builder().id(1L).name("Batman").build();
    public static final Hero hero_2 = Hero.builder().id(2L).name("SuperVir").build();

    @MockBean
    private HeroRepository heroRepository;

    @Autowired
    private WebTestClient client;

    @Test
    @WithMockUser("user")
    public void shouldListHeroes() throws Exception {
        when(heroRepository.findAll()).thenReturn(Flux.just(hero_1, hero_2));
        this.client
                .get()
                .uri("/api/heroes/")
                .exchange()
                .expectStatus().isOk()
                .expectBodyList(Hero.class).hasSize(2).contains(hero_1, hero_2)
                .consumeWith(document("hero/list"));
    }

    @Test
    @WithMockUser("user")
    public void shouldSearchHeroes() throws Exception {
        when(heroRepository.findByName("at")).thenReturn(Flux.just(hero_1));
        this.client
                .get()
                .uri(uriBuilder ->
                        uriBuilder
                                .path("/api/heroes/")
                                .queryParam("name", "at")
                                .build())
                .exchange()
                .expectStatus().isOk()
                .expectBodyList(Hero.class).hasSize(1).contains(hero_1)
                .consumeWith(document("hero/search"));
    }

    @Test
    @WithMockUser("user")
    public void shouldGetHeroById() throws Exception {
        when(heroRepository.findById(hero_2.getId())).thenReturn(Mono.just(hero_2));
        this.client.get()
                .uri("/api/heroes/%d".formatted(hero_2.getId()))
                .exchange()
                .expectStatus().isOk()
                .expectBody(Hero.class).value(CoreMatchers.is(hero_2))
                .consumeWith(document("hero/getById"));
    }

    @Test
    @WithMockUser("user")
    public void shouldCreateHero() throws Exception {
        Hero newHero = Hero.builder().name("FrankMan").build();
        Hero dbHero = Hero.builder().id(3L).name("FrankMan").build();

        when(heroRepository.save(newHero)).thenReturn(Mono.just(dbHero));

        this.client
                .mutateWith(csrf())
                .post()
                .uri("/api/heroes/")
                .bodyValue(newHero)
                .exchange()
                .expectStatus().isOk()
                .expectBody(Hero.class).value(CoreMatchers.is(dbHero))
                .consumeWith(document("hero/create"));
    }

    @Test
    @WithMockUser("user")
    public void shouldUpdateHero() throws Exception {
        Hero hero = Hero.builder().name("FrankMan").build();
        when(heroRepository.findById(hero_1.getId())).thenReturn(Mono.just(hero_1));

        ArgumentCaptor<Hero> heroArgumentCaptor = ArgumentCaptor.forClass(Hero.class);
        when(heroRepository.save(any(Hero.class))).thenAnswer(invocation -> Mono.just(invocation.<Hero>getArgument(0)));

        this.client
                .mutateWith(csrf())
                .put()
                .uri("/api/heroes/%d".formatted(hero_1.getId()))
                .bodyValue(hero)
                .exchange()
                .expectStatus().isOk()
                .expectBody(Hero.class).value(CoreMatchers.is(hero_1.withName("FrankMan")))
                .consumeWith(document("hero/update"));
    }

    @Test
    @WithMockUser("user")
    public void shouldDeleteHeroById() throws Exception {
        when(heroRepository.findById(hero_2.getId())).thenReturn(Mono.just(hero_2));
        this.client
                .mutateWith(csrf())
                .delete()
                .uri("/api/heroes/%d".formatted(hero_2.getId()))
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .consumeWith(document("hero/delete"));
    }
}
