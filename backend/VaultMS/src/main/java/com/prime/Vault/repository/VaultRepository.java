package com.prime.Vault.repository;


import com.prime.Vault.entity.Vault;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface VaultRepository extends JpaRepository<Vault,Integer> {
    Optional<Vault> findByUserId(String userId);

    @Query("SELECT CASE WHEN COUNT(vi) > 0 THEN true ELSE false END FROM Vault v JOIN v.vaultItemList vi WHERE v.userId = :userId AND vi.movieId = :movieId")
    Boolean hasUserBoughtMovie(@Param("userId") String userId, @Param("movieId") Integer movieId);

}
