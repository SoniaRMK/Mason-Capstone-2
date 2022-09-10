import React, { useContext, useState } from "react";
import UserContext from "../auth/UserContext";

/** Show limited info about a movie
 * 
 * Is rendered by MovieCardList to display a "card" for each movie.
 * 
 * Receives watched function prop from a parent, which is called on "Seen".
 * 
 * MovieCardList --> MovieCard
 */

function MovieCard({ title, poster_path, overview, vote_average, release_date }) {

    // const {hasSeenMovie, hasNotSeenMovie} = useContext(UserContext);

    // const [seen, setSeen] = useState();

    // React.useEffect(function updateSeenMovieStatus(){
    //     console.debug("MovieCard useEffect updateSeenMovieStatus", "id=", movie_id)
    // }, [movie_id, hasSeenMovie]);

    // // sets movie as seen
    // async function handleSeenMovie(e){
    //     if(hasSeenMovie(movie_id)) return;
    //     hasNotSeenMovie((movie_id));
    //     setSeen(true);
    // }

    return (
        <div className="MovieCard card">
            <div className="card-body">
                <h3>{title}</h3>
                <img src={poster_path}></img>
                <p>{overview}</p>
                <p>{vote_average}</p>
                <p>{release_date}</p>
                <button className="btn btn-danger font-weight-bold text-uppercase float-right">Seen</button>
            </div>
        </div>
    )
}


export default MovieCard;