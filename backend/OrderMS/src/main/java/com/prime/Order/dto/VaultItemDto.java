package com.prime.Order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VaultItemDto {
    private Integer vaultItemId;
    private MovieSummaryDto movie;
}
