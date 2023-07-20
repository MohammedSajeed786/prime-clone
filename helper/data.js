// import fetch from "node-fetch";
// import fs from "fs";

// const fetchData = () => {
//   // Replace with your API URL
//   const filePath = "data.json";
//   const url = "https://api.themoviedb.org/3/discover/movie?page=1";
//   const options = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWNlYzY4MmIxMDZkYTJhMTFjY2ViMjAzMzExYzc4YiIsInN1YiI6IjY0YjdmMTA1NWFhZGM0MDBhZGRiZmE2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._nHSF_O21Ucp-S-9wwjvMqqWvnveh4QNayzHjssgDBk",
//     },
//   };

//   fetch(url, options)
//     .then((res) => res.json())
//     .then((json) => {
//       let moviesData = {
//         movies: [],
//       };
    

//       json.results.foreach((movieItem) => {
//         const url = "https://api.themoviedb.org/3/movie/" + movieItem.id;

//         fetch(url, options)
//           .then((res) => res.json())
//           .then((movieItemData) => {
//             let genres = [];
//             movieItemData.genres.foreach((genre) => genres.push(genre.name));

//             let casts = [];
//             const url = `https://api.themoviedb.org/3/movie/${movieItemData.id}/credits`;

//             fetch(url, options)
//               .then((res) => res.json())
//               .then((castData) => {
//                 for (let i = 0; i < 3; i++) {
//                   casts.push(castData.cast[i].name);
//                 }
//                 let movie = {
//                   id: movieItemData.id,
//                   title: movieItemData.title,
//                   releaseYear: movieItemData["release_date"].substring(0, 4),
//                   description: movieItemData.overview,
//                   thumbnail:
//                     "https://image.tmdb.org/t/p/w500" +
//                     movieItemData.poster_path,
//                   backdrop:
//                     "https://image.tmdb.org/t/p/w500" +
//                     movieItemData.backdrop_path,
//                   genres: genres,
//                   duration: movieItemData.runtime,
//                   language: movieItem.original_language,
//                   rating: movieItem.vote_average,
//                   producer: castData.crew[0].name,
//                   director: castData.crew[1].name,
//                   casts: casts,
//                 };

//                 moviesData = {
//                   ...moviesData,
//                   movies: moviesData.movies.push(movie),
//                 };
//               })
//               .catch((err) => console.error("error:" + err));
//           })
//           .then(() => {
//             let json = JSON.stringify(moviesData);
//             const jsonString = JSON.stringify(json, null, 2); // The 'null, 2' parameters add indentation for better readability

//             // Append the JSON string to the file
//             fs.appendFile(filePath, jsonString, (err) => {
//               if (err) {
//                 console.error("Error appending JSON data to file:", err);
//               } else {
//                 console.log("JSON data appended to file successfully.");
//               }
//             });
//           })

//           .catch((err) => console.error("error:" + err));
//       });
//     })

//     .catch((err) => console.error("error:" + err));
// };

// fetchData();



import fetch from "node-fetch";
import fs from "fs";

const fetchData = async () => {
  const filePath = "data.json";
  const url = "https://api.themoviedb.org/3/discover/movie?page=4";
  const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWNlYzY4MmIxMDZkYTJhMTFjY2ViMjAzMzExYzc4YiIsInN1YiI6IjY0YjdmMTA1NWFhZGM0MDBhZGRiZmE2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._nHSF_O21Ucp-S-9wwjvMqqWvnveh4QNayzHjssgDBk"; // Replace with your API key

  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const jsonData = await response.json();

    const moviesData = { movies: [] };

    for (const movieItem of jsonData.results) {
      const movieItemResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movieItem.id}`,
        options
      );
      const movieItemData = await movieItemResponse.json();

      const creditsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movieItemData.id}/credits`,
        options
      );
      const creditsData = await creditsResponse.json();

      const genres = movieItemData.genres.map((genre) => genre.name);

      const casts = creditsData.cast.slice(0, 3).map((cast) => cast.name);

      const movie = {
        id: movieItemData.id,
        title: movieItemData.title,
        releaseYear: movieItemData["release_date"].substring(0, 4),
        description: movieItemData.overview,
        thumbnail: "https://image.tmdb.org/t/p/w500" + movieItemData.poster_path,
        backdrop: "https://image.tmdb.org/t/p/w500" + movieItemData.backdrop_path,
        genres: genres,
        duration: movieItemData.runtime,
        language: movieItemData.original_language,
        rating: movieItemData.vote_average,
        producer: creditsData.crew[0].name,
        director: creditsData.crew[1].name,
        casts: casts,
      };

      moviesData.movies.push(movie);
    }

    const jsonString = JSON.stringify(moviesData, null, 2);

    // Write the JSON string to the file
    fs.appendFile(filePath, jsonString, (err) => {
      if (err) {
        console.error("Error writing JSON data to file:", err);
      } else {
        console.log("JSON data written to file successfully.");
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData();

