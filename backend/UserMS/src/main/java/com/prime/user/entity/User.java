package com.prime.user.entity;


import com.prime.user.dto.RegisterDto;
import com.prime.user.dto.UserDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID userId;

    @Column(unique = true)
    String email;

    @Column(unique = true)
    String username;
    String fullName;
    String password;
    Integer otp;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userId.toString();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public RegisterDto convertEntityToDto(){
        return RegisterDto.builder().email(this.email).fullName(this.fullName).username(this.username).password(this.password).build();
    }
    public UserDto convertEntityToUserDto(){
        return UserDto.builder().userId(this.userId).email(this.email).fullName(this.fullName).username(this.username).password(this.password).build();
    }
}
