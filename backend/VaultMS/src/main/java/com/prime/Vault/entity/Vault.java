package com.prime.Vault.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@Builder
@AllArgsConstructor
public class Vault {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer vaultId;

    @Column(unique = true)
    private String userId;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(referencedColumnName = "vaultId", name = "vaultId")
    private List<VaultItem> vaultItemList;

    public Vault() {
        vaultItemList = new ArrayList<>();
    }


}
