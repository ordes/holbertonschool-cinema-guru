import { useState, useEffect } from 'react';
import './dashboard.css';
import MovieCard from '../../components/movies/MovieCard';
import axios from 'axios';

const WatchLater = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    const watchLaterResponse = await axios.get('http://localhost:8000/api/titles/watchlater/', {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                    setMovies(watchLaterResponse.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h1 style={{ color: '#fff', textAlign: 'center', padding: '20px 0' }}>Movies to watch later</h1>
            <div className='movieContainer'>
                {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </>
    );
}

export default WatchLater;