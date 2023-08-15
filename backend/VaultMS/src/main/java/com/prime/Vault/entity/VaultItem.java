package com.prime.Vault.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class VaultItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer vaultItemId;
    Integer movieId;

}
