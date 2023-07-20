package com.prime.movie.entity;



import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.prime.movie.dto.MovieDetailsDto;
import com.prime.movie.dto.MovieSummaryDto;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
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
    private long id;
    private String title;
    private String releaseYear;
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
                .id(entity.getId())
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
                .id(entity.getId())
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
