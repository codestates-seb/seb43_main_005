package com.firesuits.server.domain.member.service;

public interface EmailService{
    void sendTemporaryCode(String email, String code);
}
