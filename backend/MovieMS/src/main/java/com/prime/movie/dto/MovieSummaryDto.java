package com.prime.movie.dto;

import com.prime.movie.entity.Movie;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieSummaryDto {
    private Integer movieId;
    private String title;
    private String releaseYear;
    private String description;
    private String thumbnail;
    private int duration;
    private String language;
    private Double price;


    public static Movie convertDtoToEntity(MovieSummaryDto dto) {
        return Movie.builder().movieId(dto.getMovieId()).title(dto.getTitle()).releaseYear(dto.getReleaseYear()).description(dto.getDescription()).thumbnail(dto.getThumbnail())
                .duration(dto.getDuration()).language(dto.getLanguage()).price(dto.getPrice())
                .build();

    }

}
