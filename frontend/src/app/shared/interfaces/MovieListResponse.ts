export interface MovieListResponse {
    currentPage: number
    pageSize: number
    totalResults: number
    movies: Movie[]
  }
  
  export interface Movie {
    movieId: number
    title: string
    releaseYear: string
    description: string
    thumbnail: string
    duration: number
    language: string
    price:number
}


  