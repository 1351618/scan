import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import './search_results.css';
import search_results_img from "./search_results_img.png"
import GeneralSummary from './general_summary/general_summary';
import { PublicationIdsContext } from '../../AuthContext';
import { AuthContext } from '../../AuthContext';

function SearchResults() {
  // ============== определение переменных и состояний ===================
  const { authInfo, setAuthInfo, } = useContext(AuthContext);
  const [queryCount, setQueryCount] = useState(2);

  const { publicationIds } = useContext(PublicationIdsContext);
  const [requestStatus, setRequestStatus] = useState<{ [id: string]: any }>({});

  // ================= запрос на сервер ==================
  const handleShowMore = (id: any) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authInfo.token}` //  ключ авторизации
      },
      body: JSON.stringify({ ids: [id] }),
    };
  
    fetch('https://gateway.scan-interfax.ru/api/v1/documents', requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка сети');
        }
      })
      .then((data) => {
        // console.log("Результат запроса:", data);
        // Обработка полученных данных
        setRequestStatus(prevStatus => ({ ...prevStatus, [id]: data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ==============================================================
  const handleShowMoreCont = () => {
    setQueryCount(prevQueryCount => prevQueryCount + 2);
  };

  const renderPublicationItems = () => {
    const displayedPublicationIds = publicationIds.publicationIds.slice(0, queryCount);

    return displayedPublicationIds.map((id, index) => {
      const title = `Publication ${index + 1}`;

      if (!requestStatus[id] && queryCount > index) {
        handleShowMore(id);
      }


      // === парс контента =====
      {/* ----- источник ----------*/}
      let sourceData = null;
      if (requestStatus[id]) {
        sourceData = JSON.stringify(requestStatus[id][0].ok.source.name);
      }
       {/* ----- дата ------------ */}
      let dataData = requestStatus[id] ? 
        new Date(requestStatus[id][0].ok.issueDate).toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }) : "-";
      
      {/* -------- заголовок --------- */}
      let titleData = requestStatus[id] ? JSON.stringify(requestStatus[id][0].ok.title.text) : "-";

      {/* ----------  содержимое --------- */}
      const markupData = requestStatus[id] ? requestStatus[id][0].ok.content.markup : "-";
      // console.log("markupData=========", markupData,  "==============markupData");


      {/* ---------- кол во слов ----------- */}
      let wordCountData = requestStatus[id] ? JSON.stringify(requestStatus[id][0].ok.attributes.wordCount) : "-";
    
      // ==================

      return (
        <div  className="search-results__block-documents_stule" key={id}>
          {/* если данных нет - отображаем пустую строку  */}
          {/* {requestStatus[id] && (<span>{JSON.stringify(requestStatus[id][0].ok.title.text)}</span>)}{!requestStatus[id] && <span>" "</span>} */}

          <div className='search-results__block-documents_stule_date-source'>
            <span>{dataData}</span>         {/* ----- дата ------------ */}
            <span>{sourceData}</span>       {/* ----- источник ----------*/}
          </div>
          <p className='search-results__block-documents_stule_article-title'>{titleData}</p>        {/* -------- заголовок --------- */}
          
          <button className='search-results__block-documents_stule_tech-news'>Технические новости</button>
          <img className='search-results__block-documents_stule_img' src={search_results_img} alt="" />
          {/* ----------  содержимое --------- */}
          <p className='search-results__block-documents_stule_span'>  {markupData}</p>
          <div className='search-results__block-documents_stule_read-words'>
            {/* -------  кнопка с переходом на источник ------------ */}
            <button className='search-results__block-documents_stule_read-words_button'
                    onClick={() => window.open(requestStatus[id][0].ok.url, '_blank')}>
                      Читать в источнике
            </button>
            {/* ---------- кол во слов ----------- */}
            <p className='search-results__block-documents_stule_read-words_p'>  {wordCountData} слова</p>
          </div>
        </div>
          
        // </div>
      );
    });
  };
  
  // ==============================================================
    


  return (
    <>
      <Header />
      <div className="search-results__title">
        <div className="search-results__title_block">
          <p>Ищем. Скоро<br />будут результаты</p>
          <span>Поиск может занять некоторое время, просим сохранять терпение.</span>
        </div>
        <img src={search_results_img} alt="" />
      </div>

      <GeneralSummary />

      <p className="search-results__list-documents">Список документов</p>
      {/* -----------  блоки со статьями ----------- */}
      <div className="search-results__block-documents">
        {renderPublicationItems()}
      </div>
      

      <div className="search-results__button">
        <button className="search-results__button_show-more" onClick={handleShowMoreCont}>
          Показать больше
        </button>
      </div>

      <div className="search__footer">
        <Footer />
      </div>
    </>
  );
}

export default SearchResults;