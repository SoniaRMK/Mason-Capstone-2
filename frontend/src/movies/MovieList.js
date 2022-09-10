import React, { useEffect, useState } from "react";
import MovieDatabaseApi from "../../api/MovieDatabaseApi";
import MovieCardList from "./MovieCardList";
import LoadingSpinner from "../common/LoadingSpinner";
import Search from "../common/SearchForm";

/** Display page with list of movies.
 * 
 * On mount, loads movies from API.
 * 
 * Re-loads filtered movies on submit form
 * 
 * MovieList --> MovieCardList --> MovieCard
 * 
 */

function MovieList(){
    const [movies, setMovies] = useState(null);
    useEffect( function getMoviesOnMount() {
        Search();
    })



    if(!movies) return <LoadingSpinner />;

}