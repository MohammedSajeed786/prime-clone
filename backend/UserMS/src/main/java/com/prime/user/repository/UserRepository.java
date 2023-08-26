package com.prime.user.repository;

import com.prime.user.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByUserId(UUID uuid);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);


    @Modifying
    @Transactional
    @Query("update User u set u.profilePicture=:fileName where u.userId=:userId")
    void updateProfilePicture(UUID userId, String fileName);

    @Modifying
    @Transactional
    @Query("update User u set u.fullName=:fullName where u.userId=:userId")
    void updateFullName(UUID userId, String fullName);
}
