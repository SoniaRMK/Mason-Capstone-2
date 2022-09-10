import axios from "axios";


class UserDatabaseApi {
    // token for interactions with the User Database
    static token;

    static async request(endpoint, data = {}, method='get'){
        console.debug("User API Call: ", endpoint, data, method);

        }

    // Individual API routes

    /** Get current user. */

    static async getCurrentUser(username){
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Rate a movie. */

    static async rateMovie(movie_id){
        let res = await this.post(`/movie/${movie_id}/rating`);
        return res.movie_id;
    }

    /** Delete movie rating. */
    
    static async deleteMovieRating(movie_id){
        let res = await this.delete(`/movie/${movie_id}/rating`)
        return res.movie_id;
    } 
}