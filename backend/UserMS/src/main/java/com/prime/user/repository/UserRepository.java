package com.prime.user.repository;

import com.prime.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByUserId(UUID uuid);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);
}