package com.firesuits.server.global.config;

import com.fasterxml.classmate.TypeResolver;
import com.firesuits.server.global.auth.dto.LoginDto;
import lombok.RequiredArgsConstructor;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.ApiKeyVehicle;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Configuration
public class SwaggerConfig {

    private final TypeResolver typeResolver;
    @Bean
    public Docket apiDocket() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                .securitySchemes(Collections.singletonList(apiKey()))
                .securityContexts(Collections.singletonList(securityContext()))
                .additionalModels(typeResolver.resolve(LoginDto.class))
                .apiInfo(apiInfo());
    }

    private ApiKey apiKey() {
        return new ApiKey("JWT", "Authorization", ApiKeyVehicle.HEADER.getValue());
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .forPaths(PathSelectors.any())
                .build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Arrays.asList(new SecurityReference("JWT", authorizationScopes));
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Team FireSuite API Documentation\n")
                .description("Docs Version 1.0\n" +
                        "Modified (23.05.10)\n" +
                        "Authentication\n" +
                        "POST, PATCH, DELETE 등 데이터 변경점이 일어나는 Method 들은 필수로 JWT를 통한 검증 작업이 필요하며, 일부 사용자 데이터가 필요한 GET요청 또한 JWT를 통한 검증이 필요합니다. 아래 Authorize 버튼을 누른후 로그인후 발급받은 토큰을 넣어 주세요.")
                .version("1.0")
                .build();
    }
}