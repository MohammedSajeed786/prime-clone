package com.prime.Order.dto;

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
}
