import { useState, useEffect } from 'react';
import './movies.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import cinemaImg from '../../assets/cinemaimg.png';
import Image from './Image';

const MovieCard = ({ movie }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);

    useEffect(() => {
        const fetchUserLists = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken || !movie?.imdbId) return;

                const headers = { Authorization: `Bearer ${accessToken}` };

                const [favResponse, watchResponse] = await Promise.all([
                    axios.get('http://localhost:8000/api/titles/favorite/', { headers }),
                    axios.get('http://localhost:8000/api/titles/watchlater/', { headers })
                ]);

                setIsFavorite(favResponse.data.some((m) => m.imdbId === movie.imdbId));
                setIsWatchLater(watchResponse.data.some((m) => m.imdbId === movie.imdbId));
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserLists();
    }, [movie?.imdbId]);

    const handleClick = async (type) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return;

        const headers = { Authorization: `Bearer ${accessToken}` };
        const isActive = type === 'favorite' ? isFavorite : isWatchLater;
        const setState = type === 'favorite' ? setIsFavorite : setIsWatchLater;

        try {
            if (isActive) {
                await axios.delete(
                    `http://localhost:8000/api/titles/${type}/${movie.imdbId}`,
                    { headers }
                );
                setState(false);
            } else {
                await axios.post(
                    `http://localhost:8000/api/titles/${type}/${movie.imdbId}`,
                    {},
                    { headers }
                );
                setState(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='movieCard'>
            <ul className='movieCardList'>
                <div>

                    <li
                        style={{ color: isFavorite ? 'red' : 'white' }}
                        onClick={() => handleClick('favorite')}
                        className='movieCardIcons'
                    >
                        <FontAwesomeIcon icon={faStar} />
                    </li>

                    <li
                        style={{ color: isWatchLater ? 'red' : 'white' }}
                        onClick={() => handleClick('watchlater')}
                        className='movieCardIcons2'
                    >
                        <FontAwesomeIcon icon={faClock} />
                    </li>

                    <li>
                        <Image
                            imageUrl={movie.imageurls?.[0]}
                            fallBackUrl={cinemaImg}
                        />
                    </li>

                    <li className='movieTitle'>
                        {movie.title}
                    </li>

                </div>

                <li className='movieSynopsis'>
                    {movie.synopsis || 'Not available'}
                </li>

                <ul className='genresContainer'>
                    {movie.genres?.map((genre, index) => (
                        <li key={index} className='movieGenre'>
                            {genre}
                        </li>
                    ))}
                </ul>

            </ul>
        </div>
    );
};

export default MovieCard;