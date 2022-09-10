import React from "react";
import MovieCard from "./MovieCard";

/** Display list of movies
 * 
 * 
 */

function MovieCardList ({movies}){
    console.debug("MovieCardList", "movies=", movies);

    return (
        <div>
            {movies.map(movie => (
                <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    poster={movie.poster_path}
                    overview={movie.overview}
                    releaseDate={movie.release_date}
                    voteAverage={movie.vote_average}
                />
            ))}
        </div>
    )
}

export default MovieCardList;