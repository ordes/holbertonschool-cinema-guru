import  { useState } from 'react';
import './movies.css';

const Tag = ({ genre, filter, genres, setGenres }) => {
    const [selected, setSelected] = useState(false);

    const handleTag = () => {
        if (selected) {
            const updatedGenres = genres.filter((g) => g !== genre);
            setGenres(updatedGenres);
            setSelected(false);
        } else {
            setGenres([...genres, genre]);
            setSelected(true);
        }
    };

    return (
        <li onClick={handleTag} className={`tagListElement${selected ? ' selected' : ''}`}>
            {genre}
        </li>
    );
};

export default Tag;