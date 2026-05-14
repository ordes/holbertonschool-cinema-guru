import { useState, useEffect } from 'react';
import './dashboard.css';
import MovieCard from '../../components/movies/MovieCard';
import axios from 'axios';

const Favorites = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    const favoriteResponse = await axios.get('http://localhost:8000/api/titles/favorite/', {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                    setMovies(favoriteResponse.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h1 style={{ color: '#fff', textAlign: 'center', padding: '20px 0' }}>Movies you like</h1>
            <div className='movieContainer'>
                {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </>
    );
}

export default Favorites;