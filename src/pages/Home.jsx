import {useEffect, useState} from "react";
import Search from "../components/Search.jsx";
import MovieCard from "../components/MovieCard.jsx";
import Category from "../components/Category.jsx";
import Note from "../components/Note.jsx";
import Language from "../components/Language.jsx";
import {useDebounce} from "react-use";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import LikeMovie from "../components/LikeMovie.jsx";
import {useNavigate} from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_OPTIONS = {
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${API_KEY}`,
    }
}

export default function Home(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [noteFilter, setNoteFilter] = useState(null);
    const [languageFilter, setLanguageFilter] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [likedMovies, setLikedMovies] = useState([]);
    const [load, setLoad] = useState(false);


    const navigate = useNavigate();

    const toggleLike = (movie)=>{
        setLikedMovies(prev=>{
            const alreadyLikedMovies = prev.some(m => m.id === movie.id);
            if (alreadyLikedMovies){
                return prev.filter(m => m.id !== movie.id);
            }
            else{
                return [...prev, movie];
            }
        });
    }



    useDebounce(()=> setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

    const fetchMovies = async(query = "", category = "", page, minVote = null, language = "")=>{
        setLoading(true);
        setError("");
        try{
            const endpoint = query? `${API_BASE_URL}/search/movie?query=${query}&page=${page}`  :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok){
                throw new Error("Could not fetch movies from API");
            }
            const data = await response.json();
            if (data.Response === false){
                setError("Could not fetch movies from API");
                return;
            }
            let movies = data.results;


            if (category.length>0){
                const categoryEndpoint = query? `${API_BASE_URL}/genre/movie/list?query=${query}&page=${page}` : `${API_BASE_URL}/genre/movie/list?&sort_by=popularity.desc&page=${page}`;
                const resp2 = await fetch(categoryEndpoint, API_OPTIONS);
                if (!resp2.ok){
                    throw new Error("Could not fetch movies from API");
                }
                const data2 = await resp2.json();
                const categorySearched = data2.genres.find(e=>e.name.toLowerCase() === category.toLowerCase());

                movies = movies.filter(movie => movie.genre_ids.includes(categorySearched.id));
            }

            if (minVote !== null){
                movies = movies.filter(movie => movie.vote_average>minVote);
            }

            if (language !== ""){
                movies = movies.filter(movie => movie.original_language === language.toLowerCase());
            }

            setMovies(movies || []);
            setTotalPages(data.total_pages|| movies.length);
        } catch (error) {
            setError(error.message);
            return;
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchMovies(debouncedSearchTerm, categoryFilter, currentPage, noteFilter, languageFilter);
    }, [debouncedSearchTerm, categoryFilter, currentPage, noteFilter, languageFilter]);


    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("likedMovies"));
        if (saved){
            setLikedMovies(saved);
        }
        setLoad(true)
    }, []);

    useEffect(()=>{
        if (load){
            localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
        }
    },[likedMovies, load]);
    return (
        <div className="max-w-screen-lg inline-block text-center">
            <h1 className="hero-text">
                Find Thousands of <span className="bg-gradient-to-r from-white to-blue-800 bg-clip-text text-transparent">Movies</span> and <span className="bg-gradient-to-r from-purple-900 to-gray-300 bg-clip-text text-transparent">Series</span> in the best Streaming app in the World...
            </h1>
            <header className="header">
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <div className="filters">
                    <Category categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />
                    <Note noteFilter={noteFilter} setNoteFilter={setNoteFilter} />
                    <Language languageFilter={languageFilter} setLanguageFilter={setLanguageFilter} />
                </div>

            </header>


            {loading? <LoadingSpinner /> : (
                error? <p className="text-red-600 text-xl">{error}</p> : (
                    movies.length > 0? (

                            <div className="content">
                                <h1 className="text-left text-white text-3xl font-bold m-6">Popular Movies</h1>
                                <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-12">
                                    {movies.map((movie)=>(
                                        <li key={movie.id} onClick={()=>navigate(`/movie/${movie.id}`, {state : {movie}})}>
                                            <MovieCard movie={movie} isLiked={likedMovies.some(m=>m.id === movie.id)} onToggleLiked={toggleLike} />
                                        </li>
                                    ))}
                                </ul>
                                <div className="pagination">
                                    <button className="prev" onClick={()=> setCurrentPage((prev)=>prev!==1 ? prev - 1 : prev)} disabled={currentPage === 1}>Prev</button>
                                    <span>Page {currentPage} / {totalPages}</span>
                                    <button className="next" onClick={()=> setCurrentPage((prev)=>prev<totalPages ? prev + 1 : prev)} disabled={currentPage === totalPages}>Next</button>
                                </div>
                            </div>





                    ) : <p>No results found 😢</p>
                )
                )}
        </div>
    )
}
