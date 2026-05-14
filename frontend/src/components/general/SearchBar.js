import './general.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ title, setTitle }) => {
    return (
        <div className='searchBar'>
            <FontAwesomeIcon icon={faSearch} className='searchIcon' />
            <input
                type='search'
                value={title}
                placeholder='Search Movies'
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;