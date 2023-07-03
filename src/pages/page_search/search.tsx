import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import './search.css';
// import lock from "./lock.png"
import search_img from "./search_img.png"
import SearchPlaceholder from './search_placeholder/search_placeholder';


function Search() {
    return (
        <>
            <Header />
            <div className="search">

                <div className="search__content">

                    <div className="search__content_element">
                        <p className='search__content_element-p'>
                            Найдите необходимые  <br /> 
                            данные в пару кликов.
                        </p>
                        <span  className='search__content_element-span'>
                            Задайте параметры поиска. <br />
                            Чем больше заполните, тем точнее поиск
                        </span>
                        <div className='search__content_element-placeholder'>
                            <SearchPlaceholder/>
                        </div>
                    </div>

                    <img className='search__img' src={search_img} alt="" />
                </div>
            </div>
            
            <div className="search__footer">
                <Footer />
            </div>
        </>
    );
}

export default Search;
