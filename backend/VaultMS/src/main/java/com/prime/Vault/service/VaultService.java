package com.prime.Vault.service;


import com.prime.Vault.dto.VaultDto;
import com.prime.Vault.dto.VaultItemDto;

import java.util.List;

public interface VaultService {

    public VaultItemDto addToVault(String authorizationHeader, String userid, Integer movieId);

    public void removeFromVault(Integer vaultItemId);


    VaultDto getVault(String authorizationHeader, String userId);

    void addToVault(String userId, List<Integer> movieIdList);

    Boolean hasUserBoughtMovie(String userId, Integer movieId);
}
