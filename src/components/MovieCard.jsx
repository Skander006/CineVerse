import LikeMovie from "./LikeMovie.jsx";


export default function MovieCard({movie, isLiked, onToggleLiked}) {
    const {poster_path, title, vote_average, release_date, original_language} = movie;

    return (
        <div className="card relative">
            <LikeMovie isLiked={isLiked} onToggleLiked={()=>onToggleLiked(movie)} />
            <img src={poster_path? `https://image.tmdb.org/t/p/w500/${poster_path}` : './no-image.jpg'} alt="movie poster" />
            <h2>{title}</h2>
            <div className="lower-content">
                <div className="rating">
                    <img src="./star.png" alt="star" />
                    <p>{vote_average? vote_average.toFixed(1) : "N/A"}</p>
                </div>
                <span>•</span>
                <p>{release_date? release_date.split('-')[0] : "N/A"}</p>
                <span>•</span>
                <p className="capitalize">{original_language? original_language : "N/A"}</p>
            </div>
        </div>
    )
}