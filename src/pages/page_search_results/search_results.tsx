import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import './search_results.css';
import search_results_img from "./search_results_img.png"
import GeneralSummary from './general_summary/general_summary';



function SearchResults() {
    return (
        <>
            <Header />
            <div className="search-results__title">
                <div className="search-results__title_block">
                    <p>Ищем. Скоро <br />
                    будут результаты</p>
                    <span>Поиск может занять некоторое время, просим сохранять терпение.</span>
                </div>
                <img src={search_results_img} alt="" />
            </div>

            <GeneralSummary />
            <p className="search-results__list-documents">Список документов</p>
            <div className="search-results__block-documents">
                <div className="search-results__block-documents_stule">
                    <div className='search-results__block-documents_stule_date-source'>
                        <span>13.09.2021</span>
                        <a href="">Комсомольская правда KP.RU</a>
                    </div>
                    <p className='search-results__block-documents_stule_article-title'>
                        Скиллфэктори - лучшая онлайн-школа для будущих айтишников
                    </p>
                    <button className='search-results__block-documents_stule_tech-news'>Технические новости</button>
                    <img className='search-results__block-documents_stule_img' src={search_results_img} alt="" />
                    <p  className='search-results__block-documents_stule_span'>
                        SkillFactory — школа для всех, кто хочет изменить свою карьеру и жизнь. С 2016 года обучение прошли 20 000+ человек из 40 стран с 4 континентов, самому взрослому студенту сейчас 86 лет. Выпускники работают в Сбере, Cisco, Bayer, Nvidia, МТС, Ростелекоме, Mail.ru, Яндексе, Ozon и других топовых компаниях.
                        <br /><br />
                        Принципы SkillFactory: акцент на практике, забота о студентах и ориентир на трудоустройство. 80% обучения — выполнение упражнений и реальных проектов. Каждого студента поддерживают менторы, 2 саппорт-линии и комьюнити курса. А карьерный центр помогает составить резюме, подготовиться к собеседованиям и познакомиться с IT-рекрутерами.
                    </p>
                    <div className='search-results__block-documents_stule_read-words'>
                        <button className='search-results__block-documents_stule_read-words_button'>Читать в источнике</button>
                        <p className='search-results__block-documents_stule_read-words_p'>2 543 слова</p>
                    </div>
                </div>

                <div className="search-results__block-documents_stule">
                </div>
                <div className="search-results__block-documents_stule">
                </div>
                
            </div>

            <div className="search-results__button">
                <button className="search-results__button_show-more">Показать больше</button>
            </div>
            

            <div className="search__footer">
                <Footer />
            </div>
        </>
    );
}

export default SearchResults;
