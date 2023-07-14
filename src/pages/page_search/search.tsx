import React, {useContext} from 'react';

import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import './search.css';
// import lock from "./lock.png"
import search_img from "./search_img.png"
import SearchPlaceholder from './search_placeholder/search_placeholder';
import { AuthContext } from '../../AuthContext';




function Search() {

    const { authInfo } = useContext(AuthContext);
    if (authInfo.isAuthenticated === false ) {
        window.location.href = '/';
    }



    return (
        <>
            <Header />
            <div className="search-titl">
                <div className="search__content_element">
                    <p className='search__content_element-title'>
                        Найдите необходимые  <br /> 
                        данные в пару кликов.
                    </p>
                    <p  className='search__content_element-text'>
                        Задайте параметры поиска. <br />
                        Чем больше заполните, тем точнее поиск
                    </p>
                </div>
            </div>
            <div className="search-cont">
                <SearchPlaceholder/>
                <img className='search__img' src={search_img} alt="" />
            </div>
            <Footer />
        </>
    );
}

export default Search;
