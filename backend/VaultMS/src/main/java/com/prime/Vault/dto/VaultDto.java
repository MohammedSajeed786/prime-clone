package com.prime.Vault.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VaultDto {
    private  Integer vaultId;
    private List<VaultItemDto> vault;
}
