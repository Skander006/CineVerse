import {useLocation} from "react-router-dom";


export default function TVDetails() {
    const { state } = useLocation();
    const serie = state?.serie;
    return (
        <div className="tv-details">
            <div>
                <img src={serie.poster_path? `https://image.tmdb.org/t/p/w500/${serie.poster_path}` : "./no-image.jpg"} alt="serie poster" />
                <div className="tv-details-content">
                    <h3 className="text-xl"><span className="font-bold">Name :</span> {serie.name}</h3>
                    <p className="text-lg text-left"><span className="font-bold">Overview :</span> {serie.overview? serie.overview : "No Overview available for this serie"}</p>
                    <p className="text-lg"><span className="font-bold">Note :</span> {serie.vote_average? serie.vote_average : "N/A"}</p>
                    <p className="text-lg capitalize"><span className="font-bold">Original Language :</span> {serie.original_language? serie.original_language : "N/A"}</p>
                    <p className="text-lg"><span className="font-bold">Origin Country :</span> {serie.origin_country? serie.origin_country : "N/A"}</p>
                    <p className="text-lg"><span className="font-bold">Popularity :</span> {serie.popularity? Math.floor(serie.popularity) : "N/A"}</p>
                </div>

            </div>

        </div>
    );
}