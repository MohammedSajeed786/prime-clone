package com.prime.movie.service;

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


    Mono<Resource> getTrailer(Integer movieId);

    Mono<Resource> getFullMovie(Integer movieId);

    List<MovieSummaryDto> getAllMovies(Integer page, Integer pageSize, String sortBy, Sort.Direction direction);

    Long getTotalMovies();
}
