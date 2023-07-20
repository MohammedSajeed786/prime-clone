package com.prime.user.dto;

import com.prime.user.entity.User;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {



    @NotBlank(message = "email should not be blank")
    private String email;
    @NotBlank(message = "username should not be blank")
    private String username;
    @NotBlank(message = "full name should not be blank")
    private String fullName;
    @NotBlank(message = "password should not be blank")
    private String password;

    public User convertDtoToEntity(){
        return User.builder().email(this.email).fullName(this.fullName).username(this.username).password(this.password).build();
    }


}
