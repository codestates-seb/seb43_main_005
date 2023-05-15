package com.firesuits.server.global.config;

import com.firesuits.server.domain.member.service.MemberService;
import com.firesuits.server.global.auth.filter.JwtAuthenticationFilter;
import com.firesuits.server.global.auth.filter.JwtVerificationFilter;
import com.firesuits.server.global.auth.handler.*;
import com.firesuits.server.global.auth.jwt.JwtTokenizer;
import com.firesuits.server.global.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final CorsConfigurationSource corsConfigurationSource;
    private final MemberService memberService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .cors().configurationSource(corsConfigurationSource)
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeRequests(authorize -> authorize
                        .antMatchers(
                                "/v2/api-docs",
                                "/swagger-resources/**",
                                "/swagger-ui.html",
                                "/swagger-ui/**",
                                "/webjars/**")
                        .permitAll()
                        .antMatchers("/oauth2/authorization/**").permitAll()
                        .antMatchers("/login/oauth2/code/*").permitAll()
                        .antMatchers("/members", "/members/login").permitAll()
                        .antMatchers("/members/**").hasAnyRole("USER", "ADMIN")

                        .antMatchers(HttpMethod.POST, "/upload").hasAnyRole("USER", "ADMIN")

                        .antMatchers(HttpMethod.POST, "/article").hasRole("ADMIN")
                        .antMatchers(HttpMethod.PATCH, "/article/*").hasRole("ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/article/*").hasRole("ADMIN")

                        .antMatchers(HttpMethod.POST, "/articleComments/*/likes").hasAnyRole("USER", "ADMIN")

                        .antMatchers(HttpMethod.POST, "/article/*/articleComments").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.PATCH, "/article/*/articleComments/*").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/article/*/articleComments/*").hasAnyRole("USER", "ADMIN")
                        .anyRequest().permitAll()
                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer, authorityUtils, memberService)));
        return http.build();
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);

            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }
}
