package com.prime.movie.service;

import com.prime.movie.dto.MovieDetailsDto;
import com.prime.movie.dto.MovieSummaryDto;
import com.prime.movie.entity.Movie;
import com.prime.movie.entity.MovieMedia;
import com.prime.movie.exception.MovieException;
import com.prime.movie.repository.MovieMediaRepository;
import com.prime.movie.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    MovieMediaRepository movieMediaRepository;
    @Autowired
    ResourceLoader resourceLoader;

    @Override
    public void addMovies(List<MovieDetailsDto> movieDetailsDtoList) {
        List<Movie> movieList = new ArrayList<>();
        List<MovieMedia> movieMediaList = new ArrayList<>();
        String[] trailers = {"https://firebasestorage.googleapis.com/v0/b/prime-clone-a0a6b.appspot.com/o/trailers%2FMarvel%20Studios%E2%80%99%20Guardians%20of%20the%20Galaxy%20Vol.%203%20_%20Official%20Trailer.mp4?alt=media&token=7c2ab6e8-e3a1-4c4e-9edb-0889aa84a0f9", "https://firebasestorage.googleapis.com/v0/b/prime-clone-a0a6b.appspot.com/o/trailers%2FPathaan%20Trailer%20_%20Shah%20Rukh%20Khan%20_%20Deepika%20Padukone%20_%20John%20Abraham%20_%20Siddharth%20A%20_%20YRF%20Spy%20Universe.mp4?alt=media&token=b21a8350-256b-41a4-b8c1-7f27190960eb", "https://firebasestorage.googleapis.com/v0/b/prime-clone-a0a6b.appspot.com/o/trailers%2FSPIDER-MAN_%20NO%20WAY%20HOME%20-%20Official%20Trailer%20(HD).mp4?alt=media&token=618622e2-1a17-4e22-8189-ed52d1dfab2e", "https://firebasestorage.googleapis.com/v0/b/prime-clone-a0a6b.appspot.com/o/trailers%2FThe%20Flash%20-%20Official%20Trailer%202.mp4?alt=media&token=27f8c81e-897f-43b4-91c9-7f5f88962352", "https://firebasestorage.googleapis.com/v0/b/prime-clone-a0a6b.appspot.com/o/trailers%2FTransformers_%20Rise%20of%20the%20Beasts%20_%20Official%20Teaser%20Trailer%20(2023%20Movie).mp4?alt=media&token=dcf2751f-9baa-4fc6-a79b-c9b4102808cf"

        };
        String[] movies = {
                "https://firebasestorage.googleapis.com/v0/b/prime-clone-a0a6b.appspot.com/o/movies%2FBaby%20(2015)%20Full%20Movie%20in%20Hindi%20_%20Akshay%20Kumar%2C%20Anupam%20Kher%2C%20Rana%20Daggubati%20_%20HD%20Facts%20%26%20Details.mp4?alt=media&token=e6b3cfbc-4d3e-4f05-860b-d4bc9e7c76b8",
                "https://firebasestorage.googleapis.com/v0/b/prime-clone-a0a6b.appspot.com/o/movies%2FFLIGHT%20914%20-%20Hollywood%20Action%20Movie%20Hindi%20Dubbed%20_%20Faran%20Tahir%2C%20Robbie%20Kay%2C%20Aqueela%20_%20Hindi%20Movie.mp4?alt=media&token=279deff4-25c1-431e-b9bd-304e9a5d81aa",
                "https://firebasestorage.googleapis.com/v0/b/prime-clone-a0a6b.appspot.com/o/movies%2FM%20S%20%20Dhoni%20The%20Untold%20Story%20Full%20Movie%20HD%20__%20%23msdhonitheuntoldstory%20%20%23msdhoni.mp4?alt=media&token=36b3d04d-6b59-424c-b69b-391a7b17aeb2",
                "https://firebasestorage.googleapis.com/v0/b/prime-clone-a0a6b.appspot.com/o/movies%2FNew%20movie%202023%E0%A5%A4%20Full%20Bollywood%20movie%E0%A5%A4%20New%20Hindi%20movie%202023%E0%A5%A4%20Parmanu%20Full%20Movie%E0%A5%A4%20John%20Abraham.mp4?alt=media&token=1465d759-6f9e-4af0-9bd0-17b506bd8f7a",
                "https://firebasestorage.googleapis.com/v0/b/prime-clone-a0a6b.appspot.com/o/movies%2FTHE%20DETECTIVE%20-%20English%20Movie%20_%20Hollywood%20Blockbuster%20English%20Action%20Crime%20Movie%20HD%20_%20Jason%20Statham.mp4?alt=media&token=10f6a740-c76a-4010-9ff4-e2f151de41f3"
        };

        Random random = new Random();
        movieDetailsDtoList.stream().forEach((movieDetailsDto) -> {


            movieList.add(MovieDetailsDto.convertDtoToEntity(movieDetailsDto));
            int index = random.nextInt(5);
            MovieMedia movieMedia = MovieMedia.builder().movie(Movie.builder().movieId(movieDetailsDto.getMovieId()).build()).trailerPath(trailers[index]).moviePath(movies[index]).build();

            movieMediaList.add(movieMedia);

        });
        movieRepository.saveAll(movieList);
        movieMediaRepository.saveAll(movieMediaList);
    }

    @Override
    public MovieSummaryDto getMovieSummary(Integer movieId) {
        Optional<Movie> optionalMovie = movieRepository.findById(movieId);
        if (optionalMovie.isPresent()) {
            return Movie.convertEntityToSummaryDto(optionalMovie.get());
        } else throw new MovieException("movie not found");
    }

    @Override
    public MovieDetailsDto getMovieDetails(Integer movieId) {
        Optional<Movie> optionalMovie = movieRepository.findById(movieId);
        if (optionalMovie.isPresent()) {
            return Movie.convertEntityToDetailsDto(optionalMovie.get());
        } else throw new MovieException("movie not found");
    }

    @Override
    public Mono<Resource> getTrailer(Integer movieId) {
        Optional<MovieMedia> movieMedia = movieMediaRepository.findByMovieId(movieId);
        if (movieMedia.isPresent()) {
            String path = movieMedia.get().getTrailerPath();
            return Mono.fromSupplier(() -> this.resourceLoader.getResource(path));
        } else {
            throw new MovieException("movie not found");
        }


    }

    @Override
    public Mono<Resource> getFullMovie(Integer movieId) {
        Optional<MovieMedia> movieMedia = movieMediaRepository.findByMovieId(movieId);
        if (movieMedia.isPresent()) {
            String path = movieMedia.get().getMoviePath();
            return Mono.fromSupplier(() -> this.resourceLoader.getResource(path));
        } else {
            throw new MovieException("movie not found");
        }


    }

    @Override
    public List<MovieSummaryDto> getAllMovies(Integer page, Integer pageSize, String sortBy, Sort.Direction direction) {
        //logic to check page is valid
        Long totalResults = getTotalMovies();
        Long totalPages = totalResults / pageSize;
        if (totalResults % pageSize != 0) totalPages++;
        if (totalPages < page) throw new MovieException("invalid page number");
        else {
            //fetch the page data;
            page--; //since the pages will have 0-index

            Pageable pageable = PageRequest.of(page, pageSize, Sort.by(direction, sortBy));

            Page<Movie> pageData = movieRepository.findAll(pageable);
            List<MovieSummaryDto> movieSummaryDtos = new ArrayList<>();
            if (pageData.hasContent()) {
                List<Movie> movieList = pageData.getContent();
                movieList.stream().forEach((movie) -> {
                    movieSummaryDtos.add(Movie.convertEntityToSummaryDto(movie));
                });
                return movieSummaryDtos;
            } else throw new RuntimeException("some error occurred");
        }


    }

    @Override
    public Long getTotalMovies() {
        return movieRepository.count();
    }

}
