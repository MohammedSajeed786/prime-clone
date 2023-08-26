package com.prime.Vault.controller;


import com.prime.Vault.dto.VaultDto;
import com.prime.Vault.dto.VaultItemDto;
import com.prime.Vault.service.VaultService;
import com.prime.Vault.utility.VaultResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vault")
public class VaultController {

    @Autowired
    VaultService vaultService;

    @PostMapping("/add/{movieId}")
    public ResponseEntity<VaultResponse<VaultItemDto>> addToVault(@RequestHeader("Authorization") String authorizationHeader, @RequestHeader("userId") String userId, @PathVariable Integer movieId) {
        VaultItemDto vaultItemDto = vaultService.addToVault(authorizationHeader,userId, movieId);
        return new ResponseEntity<>(VaultResponse.<VaultItemDto>builder().status(201).message("movie added to vault successfully").data(vaultItemDto).build(), HttpStatus.CREATED);
    }

    @PostMapping("/addAll")
    public ResponseEntity<VaultResponse<VaultItemDto>> addAllMoviesToVault(@RequestHeader("userId") String userId, @RequestBody List<Integer> movieIdList) {
     vaultService.addToVault(userId, movieIdList);
        return new ResponseEntity<>(VaultResponse.<VaultItemDto>builder().status(201).message("movies added to vault successfully").build(), HttpStatus.CREATED);
    }



    @DeleteMapping("/remove/{vaultItemId}")
    public ResponseEntity<VaultResponse> removeFromVault(@PathVariable Integer vaultItemId) {
        vaultService.removeFromVault(vaultItemId);
        return new ResponseEntity<>(VaultResponse.builder().status(200).message("movie removed from vault successfully").build(), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<VaultResponse<VaultDto>> getVault(@RequestHeader("Authorization") String authorizationHeader,@RequestHeader("userId") String userId) {

        VaultDto vaultDto = vaultService.getVault(authorizationHeader,userId);
        return new ResponseEntity<>(VaultResponse.<VaultDto>builder().status(200).message("vault fetched successfully").data(vaultDto).build(), HttpStatus.OK);
    }

    @GetMapping("/checkMovie/{movieId}")
    public ResponseEntity<VaultResponse> checkMovie(@RequestHeader String userId,@PathVariable Integer movieId){
       Boolean hasBought= vaultService.hasUserBoughtMovie(userId,movieId);
       if(hasBought){
           return new ResponseEntity<>(VaultResponse.builder().status(200).message("user bought this movie").data(true).build(), HttpStatus.OK);
       }
       else return new ResponseEntity<>(VaultResponse.builder().status(200).message("user did not bought this movie").data(false).build(), HttpStatus.OK);

    }
}
