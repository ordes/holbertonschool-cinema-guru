import React, { useState, useEffect } from 'react';
import './dashboard.css';
import MovieCard from '../../components/movies/MovieCard';
import Button from '../../components/general/Button';
import Tag from '../../components/movies/Tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [minYear, setMinYear] = useState(1970);
    const [maxYear, setMaxYear] = useState(2022);
    const [genres, setGenres] = useState([]);
    const [sort, setSort] = useState("");
    const [title, setTitle] = useState("");
    const [page, setPage] = useState(1);

    const arrayOfGenres = [
        'Action', 'Drama', 'Comedy', 'Biography',
        'Romance', 'Thriller', 'War', 'History',
        'Sport', 'Sci-Fi', 'Documentary', 'Crime', 'Fantasy'
    ];

    useEffect(() => {
        loadMovies(page);
    }, [title, sort, genres, minYear, maxYear]);

    const loadMovies = async (page) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const response = await axios.get('http://localhost:8000/api/titles/advancedsearch', {
                headers: { 'Authorization': `Bearer ${accessToken}` },
                params: {
                    minYear,
                    maxYear,
                    genres: genres.join(','),
                    title,
                    page,
                    sort
                }
            });
            setMovies(response.data.titles);
        }
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        loadMovies(nextPage);
        setPage(nextPage);
    };

    return (
        <div className='homepage'>

            <div className='filterBar'>

                <div className='filterLeft'>

                    <div className='searchInputWrapper'>
                        <FontAwesomeIcon icon={faSearch} className='filterSearchIcon' />
                        <input
                            type='search'
                            placeholder='Search Movies...'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='filterSearchInput'
                        />
                    </div>

                    <div className='filterInputsRow'>
                        <select
                            className='filterSelect'
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value=''>Sort By</option>
                            <option value='year_desc'>Newest First</option>
                            <option value='year_asc'>Oldest First</option>
                            <option value='rating_desc'>Highest Rated</option>
                            <option value='title_asc'>A → Z</option>
                        </select>


                        <div className='yearGroup'>
                            <input
                                type='number'
                                className='filterYearInput'
                                value={minYear}
                                min={1900}
                                max={maxYear}
                                onChange={(e) => setMinYear(Number(e.target.value))}
                                placeholder='From'
                            />
                            <span className='yearSeparator'>–</span>
                            <input
                                type='number'
                                className='filterYearInput'
                                value={maxYear}
                                min={minYear}
                                max={2025}
                                onChange={(e) => setMaxYear(Number(e.target.value))}
                                placeholder='To'
                            />
                        </div>
                    </div>

                </div>

                <div className='filterRight'>
                    <ul className='tagList'>
                        {arrayOfGenres.map((tag, index) => (
                            <Tag
                                key={index}
                                genre={tag}
                                filter={true}
                                genres={genres}
                                setGenres={setGenres}
                            />
                        ))}
                    </ul>
                </div>

            </div>

            <div className='movieContainer'>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            <Button text={"Load More.."} onClick={handleLoadMore} className={'loadBtn'} />
        </div>
    );
};

export default HomePage;