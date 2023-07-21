package com.prime.movie.entity;



import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.prime.movie.dto.MovieDetailsDto;
import com.prime.movie.dto.MovieSummaryDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    private Integer movieId;
    private String title;
    private String releaseYear;
    @Column(length = 1000)
    private String description;
    private String thumbnail;
    private String backdrop;

    @Lob
    private String genres;
    private int duration;
    private String language;
    private double rating;
    private String producer;
    private String director;

    @Lob
    private String casts;

    public static MovieDetailsDto convertEntityToDetailsDto(Movie entity){
        return MovieDetailsDto.builder()
                .movieId(entity.getMovieId())
                .title(entity.getTitle())
                .releaseYear(entity.getReleaseYear())
                .description(entity.getDescription())
                .thumbnail(entity.getThumbnail())
                .backdrop(entity.getBackdrop())
                .genres(entity.convertStringToList(entity.getGenres()))
                .duration(entity.getDuration())
                .language(entity.getLanguage())
                .rating(entity.getRating())
                .producer(entity.getProducer())
                .director(entity.getDirector())
                .casts(entity.convertStringToList(entity.getCasts()))
                .build();
    }

    public static MovieSummaryDto convertEntityToSummaryDto(Movie entity){
        return MovieSummaryDto.builder()
                .movieId(entity.getMovieId())
                .title(entity.getTitle())
                .releaseYear(entity.getReleaseYear())
                .description(entity.getDescription())
                .thumbnail(entity.getThumbnail())
                .duration(entity.getDuration())
                .language(entity.getLanguage())
                .build();
    }






    public List<String> convertStringToList(String stringListJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(stringListJson, new TypeReference<List<String>>() {});
        } catch (JsonProcessingException e) {
            // Handle the exception
            return new ArrayList<>();
        }
    }


}
