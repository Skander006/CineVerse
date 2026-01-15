import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${API_KEY}`,
    }
}
export default function MovieDetails(){

    const [genres, setGenres] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { state } = useLocation();
    const movie = state?.movie;
    const fetchGenre = async (movie)=>{
        setIsLoading(true);
        try{
            const genreEndpoint = "https://api.themoviedb.org/3/genre/movie/list";
            const response = await fetch(genreEndpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            const data = await response.json();

            let genders = data.genres.filter(g=> movie.genre_ids.includes(g.id));
            setGenres(genders);
        } catch(error){
            setError(error.message);
            return;
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        fetchGenre(movie);
    },[])
    return (
        <div className="tv-details">
            <img src={movie.poster_path? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : './no-image.png'} alt="movie poster" />
            <div className="tv-details-content">
                <h3 className="text-xl"><span className="font-bold">Title : </span>{movie.title}</h3>
                <p className="text-lg text-left"><span className="font-bold">Overview : </span>{movie.overview? movie.overview : 'N/A'}</p>
                <p className="text-lg"><span className="font-bold">Note : </span>{movie.vote_average? movie.vote_average.toFixed(1) : 'N/A'}</p>
                <p className="text-lg"><span className="font-bold">Release Date : </span>{movie.release_date? movie.release_date.split('-')[0] : 'N/A'}</p>
                <p className="text-lg capitalize"><span className="font-bold">Original Language : </span>{movie.original_language? movie.original_language : 'N/A'}</p>
                <p className="text-lg"><span className="font-bold">Popularity : </span>{movie.popularity? movie.popularity : 'N/A'}</p>
                <p className="text-lg"><span className="font-bold">Genre :</span> {genres.map(g=>g.name).join(", ")}</p>

            </div>
        </div>
    )
}