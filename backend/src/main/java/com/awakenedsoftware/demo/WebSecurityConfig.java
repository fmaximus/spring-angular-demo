package com.awakenedsoftware.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.logout.DelegatingServerLogoutHandler;
import org.springframework.security.web.server.authentication.logout.SecurityContextServerLogoutHandler;
import org.springframework.security.web.server.authentication.logout.WebSessionServerLogoutHandler;
import org.springframework.security.web.server.csrf.CookieServerCsrfTokenRepository;
import org.springframework.security.web.server.csrf.CsrfWebFilter;
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatcher;
import org.springframework.web.cors.reactive.CorsUtils;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebFluxSecurity
public class WebSecurityConfig {

    public static final ServerWebExchangeMatcher CORS_PREFLIGHT_MATCHER = new CorsPreflightMatcher();

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        DelegatingServerLogoutHandler logoutHandler = new DelegatingServerLogoutHandler(
                new WebSessionServerLogoutHandler(), new SecurityContextServerLogoutHandler()
        );
        return http
                .authorizeExchange()
                .matchers(CORS_PREFLIGHT_MATCHER).permitAll()
                .pathMatchers("/api/**").permitAll()
                .anyExchange().permitAll().and()
                .logout(logout -> logout.logoutHandler(logoutHandler))
                .httpBasic(withDefaults())
                .cors().and()
                .csrf(csrf -> {
                    CookieServerCsrfTokenRepository csrfTokenRepository = CookieServerCsrfTokenRepository.withHttpOnlyFalse();
                    csrfTokenRepository.setCookieDomain("localhost:8080");
                    csrf.csrfTokenRepository(csrfTokenRepository);
                })
                .build();

    }

    private static class CorsPreflightMatcher implements ServerWebExchangeMatcher {

        @Override
        public Mono<MatchResult> matches(ServerWebExchange exchange) {
            return Mono.just(exchange.getRequest())
                    .filter(CorsUtils::isPreFlightRequest)
                    .flatMap((m) -> MatchResult.match())
                    .switchIfEmpty(MatchResult.notMatch());
        }

    }

}
