package com.prime.movie.service;

import com.prime.movie.dto.MovieDetailsDto;
import com.prime.movie.dto.MovieSummaryDto;
import com.prime.movie.entity.Movie;
import com.prime.movie.exception.MovieException;
import com.prime.movie.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    MovieRepository movieRepository;

    @Override
    public void addMovies(List<MovieDetailsDto> movieDetailsDtoList) {
        List<Movie> movieList = new ArrayList<>();

        movieDetailsDtoList.stream().forEach((movieDetailsDto) -> {
            movieList.add(MovieDetailsDto.convertDtoToEntity(movieDetailsDto));
        });
        movieRepository.saveAll(movieList);
    }

    @Override
    public MovieSummaryDto getMovieSummary(Integer movieId) {
      Optional<Movie> optionalMovie= movieRepository.findById(movieId);
      if(optionalMovie.isPresent()){
          return Movie.convertEntityToSummaryDto(optionalMovie.get());
      }
      else throw new MovieException("movie not found");
    }

    @Override
    public MovieDetailsDto getMovieDetails(Integer movieId) {
        Optional<Movie> optionalMovie= movieRepository.findById(movieId);
        if(optionalMovie.isPresent()){
            return Movie.convertEntityToDetailsDto(optionalMovie.get());
        }
        else throw new MovieException("movie not found");
    }
}
