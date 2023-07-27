package com.prime.movie.entity;


import com.prime.movie.dto.MovieMediaDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovieMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer movieMediaId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "movieId", referencedColumnName = "id")
    Movie movie;

    @Column(length = 1000)
    String trailerPath;

    @Column(length = 1000)
    String moviePath;


    public static MovieMediaDto  convertEntityToDto(MovieMedia entity) {
        return MovieMediaDto.builder().movieId(entity.getMovie().getMovieId()).trailerPath(entity.getTrailerPath()).moviePath(entity.getMoviePath()).build();
    }

}
