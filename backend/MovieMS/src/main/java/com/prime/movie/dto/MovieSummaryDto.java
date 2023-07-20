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
    private long id;
    private String title;
    private String releaseYear;
    private String description;
    private String thumbnail;
    private int duration;
    private String language;


    public static Movie convertDtoToEntity(MovieSummaryDto dto) {
        return Movie.builder().id(dto.getId()).title(dto.getTitle()).releaseYear(dto.getReleaseYear()).description(dto.getDescription()).thumbnail(dto.getThumbnail())
                .duration(dto.getDuration()).language(dto.getLanguage())
                .build();

    }

}
