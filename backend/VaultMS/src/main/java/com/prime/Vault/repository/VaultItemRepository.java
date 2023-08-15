package com.prime.Vault.repository;

import com.prime.Vault.entity.VaultItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VaultItemRepository extends JpaRepository<VaultItem,Integer> {
    VaultItem findByMovieId(Integer movieId);
}
