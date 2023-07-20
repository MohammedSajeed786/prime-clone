package com.prime.movie.service;

import com.prime.movie.dto.MovieDetailsDto;
import com.prime.movie.dto.MovieSummaryDto;

import java.util.List;

public interface MovieService {
    void addMovies(List<MovieDetailsDto> movieDetailsDtoList);

    MovieSummaryDto getMovieSummary(Integer movieId);

    MovieDetailsDto getMovieDetails(Integer movieId);
}
