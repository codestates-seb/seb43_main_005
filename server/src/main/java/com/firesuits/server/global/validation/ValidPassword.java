package com.firesuits.server.global.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = PasswordConstraintValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidPassword {
    String message() default "4~12자, 숫자와 소문자 영어를 포함해야합니다.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
