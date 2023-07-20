package com.prime.movie.controller;

import com.prime.movie.dto.MovieDetailsDto;
import com.prime.movie.dto.MovieSummaryDto;
import com.prime.movie.service.MovieService;
import com.prime.movie.utility.MovieResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movie")
public class MovieController {

    @Autowired
    MovieService movieService;

    @PostMapping("/addMovies")
    public ResponseEntity<MovieResponse> addMovies(List<MovieDetailsDto> movieDetailsDtoList){
        movieService.addMovies(movieDetailsDtoList);
        MovieResponse<Object> movieResponse=MovieResponse.builder().status(201).message("movies successfully added").build();
        return new ResponseEntity<>(movieResponse, HttpStatus.CREATED);
    }

    @GetMapping("/movieSummary/{movieId}")
    public ResponseEntity<MovieResponse> getMovieSummary(@PathVariable Integer movieId){
        MovieSummaryDto movieSummaryDto=movieService.getMovieSummary(movieId);
        MovieResponse<Object> movieResponse=MovieResponse.builder().status(200).message("movie fetched successfully").data(movieSummaryDto).build();
        return new ResponseEntity<>(movieResponse, HttpStatus.OK);

    }
    @GetMapping("/movieDetails/{movieId}")
    public ResponseEntity<MovieResponse> getMovieDetails(@PathVariable Integer movieId){
        MovieDetailsDto movieDetailsDto=movieService.getMovieDetails(movieId);
        MovieResponse<Object> movieResponse=MovieResponse.builder().status(200).message("movie fetched successfully").data(movieDetailsDto).build();
        return new ResponseEntity<>(movieResponse, HttpStatus.OK);

    }
}
