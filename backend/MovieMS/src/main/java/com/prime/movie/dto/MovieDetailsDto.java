package com.prime.movie.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.prime.movie.entity.Movie;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDetailsDto {
    private Integer movieId;
    private String title;
    private String releaseYear;
    private String description;
    private String thumbnail;
    private String backdrop;
    private List<String> genres;
    private int duration;
    private String language;
    private double rating;
    private String producer;
    private String director;
    private List<String> casts;
    private Double price;

    public static Movie convertDtoToEntity(MovieDetailsDto dto) {
        return Movie.builder()
                .movieId(dto.getMovieId())
                .title(dto.getTitle())
                .releaseYear(dto.getReleaseYear())
                .description(dto.getDescription())
                .thumbnail(dto.getThumbnail())
                .backdrop(dto.getBackdrop())
                .genres(dto.convertListToString(dto.getGenres()))
                .duration(dto.getDuration())
                .language(dto.getLanguage())
                .rating(dto.getRating())
                .producer(dto.getProducer())
                .director(dto.getDirector())
                .casts(dto.convertListToString(dto.getCasts()))
                .price(dto.getPrice())
                .build();
    }

    public String convertListToString(List<String> stringList) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(stringList);
        } catch (JsonProcessingException e) {
            // Handle the exception
        }
        return null;
    }

}
