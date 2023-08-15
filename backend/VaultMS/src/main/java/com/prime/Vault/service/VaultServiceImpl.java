package com.prime.Vault.service;

import com.prime.Vault.dto.MovieSummaryDto;
import com.prime.Vault.dto.VaultDto;
import com.prime.Vault.dto.VaultItemDto;
import com.prime.Vault.entity.Vault;
import com.prime.Vault.entity.VaultItem;
import com.prime.Vault.exception.VaultException;
import com.prime.Vault.repository.VaultItemRepository;
import com.prime.Vault.repository.VaultRepository;
import com.prime.Vault.utility.MovieResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VaultServiceImpl implements VaultService {

    @Autowired
    VaultRepository vaultRepository;


    @Autowired
    VaultItemRepository vaultItemRepository;

    @Autowired
    RestTemplate restTemplate;


    @Override
    public VaultItemDto addToVault(String authorizationHeader, String userId, Integer movieId) {

        Optional<Vault> optionalVault = vaultRepository.findByUserId(userId);
        Vault vault;
        VaultItem vaultItem = VaultItem.builder().movieId(movieId).build();
        if (optionalVault.isPresent()) {
            vault = optionalVault.get();
        } else {
            vault = new Vault();
            vault.setUserId(userId);
        }

        System.out.println(vault);
        List<VaultItem> vaultItemList = vault.getVaultItemList();
        boolean hasItem = vaultItemList.stream().anyMatch((c) -> c.getMovieId().equals(movieId));
        if (hasItem) throw new VaultException("movie already present in the vault");

        vault.getVaultItemList().add(vaultItem);
        vaultRepository.save(vault);

        vaultItem = vaultItemRepository.findByMovieId(movieId);
        MovieSummaryDto movieSummaryDto = fetchMovieSummary(authorizationHeader, movieId);
        return VaultItemDto.builder().vaultItemId(vaultItem.getVaultItemId()).movie(movieSummaryDto).build();
    }


    public MovieSummaryDto fetchMovieSummary(String authorizationHeader, Integer movieId) {


        String gatewayUri = "http://GatewayMS";
        String url = gatewayUri + "/movie/movieSummary/" + movieId;
        ParameterizedTypeReference<MovieResponse<MovieSummaryDto>> responseType = new ParameterizedTypeReference<MovieResponse<MovieSummaryDto>>() {
        };


        HttpEntity<HttpHeaders> httpEntity = setHeaders(authorizationHeader);

        ResponseEntity<MovieResponse<MovieSummaryDto>> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, responseType);

        // Get the body of the response and then the data
        MovieResponse<MovieSummaryDto> movieResponse = response.getBody();
        MovieSummaryDto movieSummaryDto = movieResponse.getData();


        return movieSummaryDto;

    }

    public HttpEntity<HttpHeaders> setHeaders(String authorizationHeader) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authorizationHeader);
        return new HttpEntity<>(headers);

    }

    @Override
    public void removeFromVault(Integer vaultItemId) {
        if (!vaultItemRepository.findById(vaultItemId).isPresent())
            throw new VaultException("movie does not exist in the vault");
        vaultItemRepository.deleteById(vaultItemId);
    }

    @Override
    public VaultDto getVault(String authorizationHeader, String userId) {
        Optional<Vault> optionalVault = vaultRepository.findByUserId(userId);
        Vault vault;
        if (optionalVault.isPresent()) {
            vault = optionalVault.get();
        } else {
            vault = new Vault();

        }
        System.out.println(vault);
        List<VaultItemDto> vaultItemDtoList = new ArrayList<>();
        vault.getVaultItemList().stream().forEach((vaultItem -> {
            vaultItemDtoList.add(VaultItemDto.builder().vaultItemId(vaultItem.getVaultItemId()).movie(fetchMovieSummary(authorizationHeader, vaultItem.getMovieId())).build());

        }));

        return VaultDto.builder().vaultId(vault.getVaultId()).vault(vaultItemDtoList).build();
    }

    @Override
    public void addToVault(String userId, List<Integer> movieIdList) {
        List<VaultItem> vaultItemList = movieIdList.stream().map(movieId -> VaultItem.builder().movieId(movieId).build()).collect(Collectors.toList());

        Vault vault=Vault.builder().userId(userId).vaultItemList(vaultItemList).build();

        vaultRepository.save(vault);

    }

    @Override
    public Boolean hasUserBoughtMovie(String userId, Integer movieId){
        System.out.println(userId+" "+movieId);
        return vaultRepository.hasUserBoughtMovie(userId,movieId);
    }



}
