package com.prime.movie.service;

import com.prime.movie.dto.MovieDetailsDto;
import com.prime.movie.dto.MovieSummaryDto;
import org.springframework.core.io.Resource;
import reactor.core.publisher.Mono;

import java.util.List;

public interface MovieService {
    void addMovies(List<MovieDetailsDto> movieDetailsDtoList);

    MovieSummaryDto getMovieSummary(Integer movieId);

    MovieDetailsDto getMovieDetails(Integer movieId);


    Mono<Resource> getTrailer(Integer movieId);

    Mono<Resource> getFullMovie(Integer movieId);
}
