package com.prime.movie.repository;

import com.prime.movie.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface MovieRepository extends JpaRepository<Movie,Integer> {

    @Query("select m.genres from Movie m")
    Set<String> getAllGenres();

    @Query("select m from Movie m where m.genres like %:genre%")
    Page<Movie> findMoviesByGenre(String genre, Pageable pageable);

    @Query("select count(m) from Movie m where m.genres like %:genre%")
    Long countByGenre(String genre);

    @Query("select m from Movie m where CONCAT(m.title,m.casts) like %:searchValue% and m.genres like %:genre%")
    List<Movie> findBySearchValue(String searchValue, String genre,Sort sort);
}
