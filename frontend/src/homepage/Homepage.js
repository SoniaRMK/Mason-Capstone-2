import React, {useContext, useState} from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "../auth/UserContext";
import SearchForm from "../common/SearchForm";
// import getMovie from "../api/MovieDatabaseApi";

/** Homepage for Movie Maker Journal
 * 
 * Displays welcome messae to user and allows user to create
 * login and/or search for movies
 * 
 * Routed at /
 * 
 * Routes -> Homepage
 */

function Homepage(){
    const currentUser = useContext(UserContext);
    // const [movie, setMovie] = useState(null);
    const [search, setSearch] = useState('');
    console.debug("Homepage", "currentUser=", currentUser);

    const onChange = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);
        console.log(searchTerm)
    }

    // const onClick = () => {
    //     const response = await axios.
    // }

    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="font-weight-bold">Welcome, the next movie journey awaits</h1>
                <p className="lead">Search for your next movie!</p>

                {currentUser 
                ? <h2>
                    Welcome Back, {currentUser.firstName || currentUser.username}!
                </h2>
                : (
                    <p>
                        <Routes>
                            <Route className="btn btn-primary font-weight-bold mr-3" to="/login">
                                Log In
                            </Route>

                            <Route className="btn btn-primary font-weight-bold mr-3" to="/signup">
                                Sign Up
                            </Route>
                        </Routes>
                    </p>
                )}
            </div>
            <div>
                <SearchForm />
                <input onChange={onChange} value={search}></input>
            </div>
        </div>
    )
}

export default Homepage;