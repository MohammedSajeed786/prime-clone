package com.prime.movie.service;

import com.prime.movie.dto.MovieByGenreDto;
import com.prime.movie.dto.MovieDetailsDto;
import com.prime.movie.dto.MovieSummaryDto;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Sort;
import reactor.core.publisher.Mono;

import java.util.List;

public interface MovieService {
    void addMovies(List<MovieDetailsDto> movieDetailsDtoList);

    MovieSummaryDto getMovieSummary(Integer movieId);

    MovieDetailsDto getMovieDetails(Integer movieId);


    Mono<Resource> getTrailer(Integer movieId, String token);

    Mono<Resource> getFullMovie(Integer movieId, String token);

    List<MovieSummaryDto> getAllMovies(Integer page, Integer pageSize, String sortBy, Sort.Direction direction, String genre);



    Long getTotalMoviesByGenre(String genre);

    List<MovieByGenreDto> groupMoviesByGenre();

    List<String> getGenres();

    String generateTrailerToken(String userId);



    String generateMovieToken(String userId);

    Boolean isTokenValid(String token);
}
