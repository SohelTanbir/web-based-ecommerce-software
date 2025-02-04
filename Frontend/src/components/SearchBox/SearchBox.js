import React, { useState } from 'react';
import './Searchbox.css';
import { useSelector, useDispatch } from 'react-redux';
import { getSearchInputVal } from '../../Store/SearchSlice/SearchSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBox = () => {
    const [searchVal, setSearchVal ] =  useState("");
    const [category, setCategory] = useState([]);
    const [selectedVal, setSelectedVal] = useState("All Categories");
    const dispatch = useDispatch();

// handle search
const handleSearch  = (e)=>{
    e.preventDefault();
    
}

// handle change form data
const handleChange = (e)=>{
    setSearchVal(e.target.value);
    dispatch(getSearchInputVal(searchVal));
}
//handle change category
const handleChangeCategory = (e)=>{
    const newCategory = [...category, e.target.value]
    setCategory(newCategory);
}



    return (
         <div className='search-box'>
            <form onSubmit={handleSearch}>
                <input onChange={handleChange} type="text" placeholder='Search what do you need...' />
                <div className="search-icon">
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </form>
        </div>
    );
};

export default SearchBox;