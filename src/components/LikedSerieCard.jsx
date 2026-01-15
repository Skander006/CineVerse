
export default function LikedSerieCard({serie}) {
    const {poster_path, name, vote_average, first_air_date, original_language} = serie;

    return (
        <div className="card relative">
            <img src={poster_path? `https://image.tmdb.org/t/p/w500/${poster_path}` : './no-image.jpg'} alt="movie poster" />
            <h2>{name}</h2>
            <div className="lower-content">
                <div className="rating">
                    <img src="./star.png" alt="star" />
                    <p>{vote_average? vote_average.toFixed(1) : "N/A"}</p>
                </div>
                <span>•</span>
                <p>{first_air_date? first_air_date.split('-')[0] : "N/A"}</p>
                <span>•</span>
                <p>{original_language? original_language : "N/A"}</p>
            </div>
        </div>
    )
}