import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
// import './search.css';
import search_results_img from "./search_results_img.png"



function SearchResults() {
    return (
        <>
            <Header />
            <div className="search_results">
                <img src={search_results_img} alt="" />

            </div>
            
            <div className="search__footer">
                <Footer />
            </div>
        </>
    );
}

export default SearchResults;
