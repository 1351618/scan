import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import './home.css';
import Group13 from "./Group 13.png";
import Group14 from "./Group 14.png";

import OurRates from './our_rates/our_rates';
import WhyAreWe from './why_are_we/why_are_we';

// import icons_chevron_left "./"

function Home() {
    return (
        <>
            <Header />
            <div className="home">
                <div className="home__headline">
                    <div className="home__headline_block">
                        <p className="home__headline_block-p">сервис по поиску публикаций о компании по его ИНН</p>
                        <span className="home__headline_block-span">Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</span>
                        <button className="home__headline_block-button">Запросить данные</button>
                    </div>
                    <img className="home__headline_img" src={Group13} alt="" />
                </div>
                <div className="home__slider">
                    <WhyAreWe/>
                    
                </div>
                <div className="home__img">
                    <img src={Group14} alt="" />
                </div>
                
                <div className="home__our-rates">
                    <OurRates/>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;