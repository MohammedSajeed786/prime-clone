package com.prime.movie.utility;

import com.prime.movie.dto.MovieSummaryDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MovieListResponse {

    Integer currentPage;

    Integer pageSize;
    Long totalResults;
    Integer currentPageSize;

    List<MovieSummaryDto> movies;

}
