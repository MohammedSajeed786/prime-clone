package com.prime.movie.repository;

import com.prime.movie.entity.MovieMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieMediaRepository extends JpaRepository<MovieMedia,Integer> {

    @Query("select m from MovieMedia m where m.movie.movieId=:movieId")
    Optional<MovieMedia> findByMovieId(Integer movieId);
}
