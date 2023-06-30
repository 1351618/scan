import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import './search.css';
// import lock from "./lock.png"
import search_img from "./search_img.png"


function Search() {
    return (
        <>
            <Header />
            <div className="search">
                <div className="search__content">
                    <p className='search__content_p'>
                        Найдите необходимые  <br /> 
                        данные в пару кликов.
                    </p>
                    <span  className='search__content_span'>
                        Задайте параметры поиска. <br />
                        Чем больше заполните, тем точнее поиск
                    </span>
                    <div className='search__content_placeholder'>
                    </div>
                </div>
                <img className='authorization__img' src={search_img} alt="" />
            </div>
            
            <div className="search__footer">
                <Footer />
            </div>
        </>
    );
}

export default Search;
