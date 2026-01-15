import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom";
import Home from "./pages/Home.jsx";
import TVShows from "./pages/TVShows.jsx";
import Favorites from "./pages/Favorites.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import TVDetails from "./pages/TVDetails.jsx";

export default function App(){

    const likedMovies = JSON.parse(localStorage.getItem("likedMovies"));
    const likedSeries = JSON.parse(localStorage.getItem("likedSeries"));
    return (
        <Router>
            <div className="menu-container">
                <nav className="menu">
                    <a><NavLink to="/" className={({isActive})=> isActive? "text-blue-800 font-bold" : "text-white"}>Home</NavLink></a>
                    <a><NavLink to="/tv" className={({isActive})=> isActive? "text-blue-800 font-bold" : "text-white"}>TV Shows</NavLink></a>
                    <a><NavLink to="/favorites" className={({isActive})=> isActive? "text-blue-800 font-bold" : "text-white"}>My Favorites</NavLink></a>
                </nav>
            </div>


            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tv" element={<TVShows />} />
                <Route path="/favorites" element={<Favorites likedMovies={likedMovies} likedSeries={likedSeries} />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path='/tv/:id' element={<TVDetails />} />
            </Routes>
        </Router>
    )
}