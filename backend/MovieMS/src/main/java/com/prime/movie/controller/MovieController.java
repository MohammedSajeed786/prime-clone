package com.prime.movie.controller;

import com.prime.movie.dto.MovieByGenreDto;
import com.prime.movie.dto.MovieDetailsDto;
import com.prime.movie.dto.MovieSummaryDto;
import com.prime.movie.entity.Movie;
import com.prime.movie.service.MovieService;
import com.prime.movie.utility.MovieListResponse;
import com.prime.movie.utility.MovieResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/movie")
public class MovieController {

    @Autowired
    MovieService movieService;

    @PostMapping("/addMovies")
    public ResponseEntity<MovieResponse> addMovies(@RequestBody List<MovieDetailsDto> movieDetailsDtoList){
//        System.out.println("hello " +movieDetailsDtoList);
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

    @GetMapping("/genre/{genre}/allMovies")
    public ResponseEntity<MovieListResponse> getAllMovies(@RequestParam(defaultValue = "1") Integer page, @RequestParam(defaultValue = "20") Integer pageSize, @RequestParam(defaultValue = "movieId") String sortBy, @RequestParam(defaultValue = "ASC")Sort.Direction direction, @PathVariable String genre){

       List<MovieSummaryDto> movies= movieService.getAllMovies(page,pageSize,sortBy,direction,genre);
        MovieListResponse movieListResponse= MovieListResponse.builder().movies(movies).pageSize(movies.size()).currentPage(page).totalResults(movieService.getTotalMoviesByGenre(genre)).build();
        return new ResponseEntity<>(movieListResponse,HttpStatus.OK);

    }
    @GetMapping("/movieDetails/{movieId}")
    public ResponseEntity<MovieResponse> getMovieDetails(@PathVariable Integer movieId){
        MovieDetailsDto movieDetailsDto=movieService.getMovieDetails(movieId);
        MovieResponse<Object> movieResponse=MovieResponse.builder().status(200).message("movie fetched successfully").data(movieDetailsDto).build();
        return new ResponseEntity<>(movieResponse, HttpStatus.OK);

    }

    @GetMapping(value = "/trailer/{movieId}",produces = "video/mp4")
    public ResponseEntity<Mono<Resource>> getTrailer( @PathVariable Integer movieId,@RequestHeader("Range") String range){
//        System.out.println(range);
        return new ResponseEntity<>(movieService.getTrailer(movieId),HttpStatus.OK);
    }
    @GetMapping(value = "/fullMovie/{movieId}",produces = "video/mp4")
    public ResponseEntity<Mono<Resource>> getFullMovie( @PathVariable Integer movieId,@RequestHeader("Range") String range){
//        System.out.println(range);
        return new ResponseEntity<>(movieService.getFullMovie(movieId),HttpStatus.OK);
    }

  @GetMapping("/genres")
    public ResponseEntity<MovieResponse> getGenres(){
        List<String> genres=movieService.getGenres();

        return  new ResponseEntity<>(MovieResponse.builder().data(genres).message("genres fetched successfully").status(200).build(),HttpStatus.OK);
  }

  @GetMapping("/genres/movies")
    public  ResponseEntity<MovieResponse> getMoviesGroupedByGenres(){
      List<MovieByGenreDto> moviesByGenre=movieService.groupMoviesByGenre();
      return  new ResponseEntity<>(MovieResponse.builder().data(moviesByGenre).message("movies fetched successfully").status(200).build(),HttpStatus.OK);

  }


}
