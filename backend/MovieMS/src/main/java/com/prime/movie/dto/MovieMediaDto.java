package com.prime.movie.dto;

import com.prime.movie.entity.Movie;
import com.prime.movie.entity.MovieMedia;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovieMediaDto {
    private Integer movieId;
    private String trailerPath;
    private String moviePath;

    public static MovieMedia  convertDtoEntity(MovieMediaDto dto) {
        Movie movie=new Movie();
        movie.setMovieId(dto.getMovieId());
        return MovieMedia.builder().movie(movie).trailerPath(dto.getTrailerPath()).moviePath(dto.getMoviePath()).build();
    }
}
