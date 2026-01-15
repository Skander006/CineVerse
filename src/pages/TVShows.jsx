import {useEffect, useState} from "react";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import TVCard from "../components/TVCard.jsx";
import Search from "../components/Search.jsx";
import Category from "../components/Category.jsx";
import Language from "../components/Language.jsx";
import CategoryTV from "../components/CategoryTV.jsx";
import {useDebounce} from "react-use";
import {useNavigate, useParams} from "react-router-dom";

const API_BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    headers: {
        accept: "application/json",
        authorization: `Bearer ${API_KEY}`,
    }
}

export default function TVShows() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorSeries, setErrorSeries] = useState(null);
    const [seriesList, setSeriesList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [language, setLanguage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [likedSeries, setLikedSeries] = useState([]);
    const [load, setLoad] = useState(false);

    useDebounce(()=> setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

    const navigate = useNavigate();
    const fetchSeries = async (query = '', page = 1, category = "", language="") => {
        try{
            setIsLoading(true);
            const endpoint = query? `${API_BASE_URL}/search/tv?query=${query}&page=${page}` : `${API_BASE_URL}/discover/tv?sort_by=popularity.desc&page=${page}`;
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error("Something went wrong while fetching data!");
            }

            const data = await response.json();

            if (data.Response === false){
                setErrorSeries(data);
            }

            let series = data.results;

            if (category.length>0){
                const categoryEndpoint = `${API_BASE_URL}/genre/tv/list`;
                const response2 = await fetch(categoryEndpoint, API_OPTIONS);
                if(!response2.ok){
                    throw new Error("Category not found");
                }
                const data2 = await response2.json();

                const searchedCategory = data2.genres.find(c=>c.name.toLowerCase() === category.toLowerCase());

                if (!searchedCategory){
                    setSeriesList([]);
                    return;
                }
                series = series.filter(m => m.genre_ids.includes(searchedCategory.id));
            }

            if (language.length>0){
                series = series.filter(s => s.original_language === language.toLowerCase());
            }
            setSeriesList(series || []);
            setTotalPages(data.total_pages || series.length);
        } catch(error) {
            setErrorSeries(error.message);
            return;
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchSeries(debouncedSearchTerm, currentPage, category, language);
    }, [debouncedSearchTerm, currentPage, category, language]);


    const toggleLikedSeries = (serie)=>{
        setLikedSeries((prev)=>{
            const alreadyLiked = prev.some(l=>l.id === serie.id);
            if (alreadyLiked){
                return prev.filter(p=> p.id !== serie.id);
            }
            else{
                return [...prev, serie];
            }
        });
    }

    useEffect(()=>{
        const saved = JSON.parse(localStorage.getItem("likedSeries"));
        if (saved){
            setLikedSeries(saved);
        }
        setLoad(true);
    },[]);
    useEffect(() => {
        if (load){
            localStorage.setItem("likedSeries", JSON.stringify(likedSeries));
        }
    }, [likedSeries, load]);
    return (
        <div>
            <header className="header">
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <div className="filters">
                    <CategoryTV categoryFilter={category} setCategoryFilter={setCategory} />
                    <Language languageFilter={language} setLanguageFilter={setLanguage} />
                </div>

            </header>
            {isLoading? <LoadingSpinner /> : (
                errorSeries? <p className="text-xl text-red-700">{errorSeries}</p>
             : (
                    seriesList.length >0 ? (
                        <div className="flex flex-col justify-baseline gap-12 serie-list">
                            <h1 className="text-left text-white text-4xl font-bold">Trending Series</h1>
                            <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-12 ">
                                {seriesList.map((serie)=>(
                                    <li key={serie.id} onClick={()=>navigate(`/tv/${serie.id}`, {state : {serie} })}>
                                        <TVCard serie={serie} isLiked={likedSeries.some(l=>l.id === serie.id)} toggleLiked={toggleLikedSeries} />
                                    </li>
                                ))}
                            </ul>

                            <div className="pagination">
                                <button onClick={()=> setCurrentPage((prev)=>Math.max(prev - 1, 1))} disabled={currentPage === 1} className="prev">Prev</button>
                                <span>Page {currentPage} / {totalPages}</span>
                                <button onClick={()=> setCurrentPage((prev)=>prev<totalPages? prev+1 : totalPages)} disabled={currentPage === totalPages} className="next">Next</button>
                            </div>
                        </div>


                    ) : <p className="text-xl text-white font-normal">No results found...</p>
                ))}
        </div>

    )
}