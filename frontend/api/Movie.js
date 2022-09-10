import React from "react";
import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '?api_key=9a114ae809d1fc32f0105fcd87afe983'

function getMovie(){
    const [movie, setMovie] = useState(null);

    const onClick = async () => {
        const res = await axios.get(`${BASE_URL}/search/movie${API_KEY}`)
    }
}


export default getMovie;

