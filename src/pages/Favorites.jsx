import LikedMovieCard from "../components/LikedMovieCard.jsx";
import LikedSerieCard from "../components/LikedSerieCard.jsx";


export default function Favorites({likedMovies, likedSeries}) {

    return(
        <div className="flex flex-col gap-14 favorite">
            <h1 className="text-left bg-gradient-to-r from-red-600 to-gray-600 bg-clip-text text-transparent text-4xl font-bold">Your Liked Movies ❤️</h1>
            {likedMovies.length > 0?(
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-12">
                    {likedMovies.map((movie)=>(
                        <li className="text-white" key={movie.id}>
                            <LikedMovieCard movie={movie} />
                        </li>
                    ))}
                </ul>
            ) : null
            }

            <h1 className="text-left bg-gradient-to-r from-blue-600 to-gray-400 bg-clip-text text-transparent text-4xl font-bold">Your Liked Series ❤️</h1>
            {likedSeries.length > 0?(
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-12">
                    {likedSeries.map((serie)=>(
                        <li className="text-white" key={serie.id}>
                            <LikedSerieCard serie={serie} />
                        </li>
                    ))}
                </ul>
            ) : null
            }


        </div>
    )
}