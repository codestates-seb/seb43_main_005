package com.firesuits.server.global.auth.handler;

import com.firesuits.server.domain.member.entity.MemberMbti;
import com.firesuits.server.domain.member.entity.MemberTheme;
import com.firesuits.server.domain.member.service.MemberService;
import com.firesuits.server.global.auth.jwt.JwtTokenizer;
import com.firesuits.server.global.auth.utils.CustomAuthorityUtils;
import com.firesuits.server.global.error.exception.BusinessLogicException;
import com.firesuits.server.global.error.exception.ExceptionCode;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;

    public OAuth2MemberSuccessHandler(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, MemberService memberService) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberService = memberService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = token.getPrincipal();

        String registrationId = token.getAuthorizedClientRegistrationId();
        String email;
        String name;

        if ("google".equals(registrationId)) {
            email = (String) oAuth2User.getAttributes().get("email");
            name = (String) oAuth2User.getAttributes().get("name");
        } else if ("kakao".equals(registrationId)) {
            Map<String, Object> kakaoAccount = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
            Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");
            email = (String) kakaoAccount.get("email");
            name = (String) kakaoProfile.get("nickname");
        } else if ("naver".equals(registrationId)) {
            Map<String, Object> res = (Map<String, Object>) oAuth2User.getAttributes().get("response");
            email = (String) res.get("email");
            name = (String) res.get("name");
        } else {
            throw new BusinessLogicException(ExceptionCode.INVALID_REQUEST);
        }

        MemberMbti memberMbti = MemberMbti.테스트전;
        MemberTheme memberTheme = MemberTheme.defaultLight;
        List<String> authorities = authorityUtils.createRoles(email);
        memberService.oauthJoin(email, name, memberMbti, memberTheme);
        redirect(request, response, email, authorities);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String email, List<String> authorities) throws IOException {
            String accessToken = delegateAccessToken(email, authorities);
            String refreshToken = delegateRefreshToken(email);
            String uri = createURI(accessToken, refreshToken).toString();
            getRedirectStrategy().sendRedirect(request, response, uri);
        }

        private String delegateAccessToken(String email, List<String> authorities) {
            Map<String, Object> claims = new HashMap<>();
            claims.put("email", email);
            claims.put("roles", authorities);

            String subject = email;
            Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

            String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

            return accessToken;
        }

        private String delegateRefreshToken(String username) {
            String subject = username;
            Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
            String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
            return refreshToken;
        }

        private URI createURI(String accessToken, String refreshToken) {
            MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
            queryParams.add("access_token", "Bearer " + accessToken);
            queryParams.add("refresh_token", refreshToken);

            return UriComponentsBuilder
                    .newInstance()
                    .scheme("http")
                    .host("localhost")
                    .port(80)
                    .path("/receive-token.html")
                    .queryParams(queryParams)
                    .build()
                    .toUri();
        }
}
