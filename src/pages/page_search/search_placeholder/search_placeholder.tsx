import React, {useState, useContext } from 'react';
import './search_placeholder.css';
import { AuthContext } from '../../../AuthContext';
import { PublicationIdsContext } from '../../../AuthContext';
import { useNavigate } from 'react-router-dom';



function SearchPlaceholder() {

    const { authInfo, setAuthInfo, } = useContext(AuthContext);
    const { setPublicationIds } = useContext(PublicationIdsContext);
    const navigate = useNavigate();
    
    // =========================== тестовый запрос поисеа ===================================
    // /api/v1/objectsearch
    
    const handleSearch = () => {
        const requestOptions = {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authInfo.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            intervalType: 'month',
            histogramTypes: ['totalDocuments', 'riskFactors'],
            issueDateInterval: {
              startDate: '2019-01-01T00:00:00+03:00',
              endDate: '2022-08-31T23:59:59+03:00',
            },
            searchContext: {
              targetSearchEntitiesContext: {
                targetSearchEntities: [
                  {
                    type: 'company',
                    inn: '7710137066', // Замените на нужный ИНН
                  },
                ],
                onlyMainRole: true,
                tonality: 'any',
                onlyWithRiskFactors: false,
                riskFactors: {
                  and: [],
                  or: [],
                  not: [],
                },
                themes: {
                  and: [],
                  or: [],
                  not: [],
                },
              },
              themesFilter: {
                and: [],
                or: [],
                not: [],
              },
            },
            searchArea: {
              includedSources: [],
              excludedSources: [],
              includedSourceGroups: [],
              excludedSourceGroups: [],
            },
            attributeFilters: {
              excludeTechNews: true,
              excludeAnnouncements: true,
              excludeDigests: true,
            },
            similarMode: 'none',
            limit: 1000,
            sortType: 'sourceInfluence',
            sortDirectionType: 'desc',
          }),
        };
    
        fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch', requestOptions)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Ошибка сети');
            }
          })
          .then((data) => {
            // console.log(data);  // проверка
            const newPublicationIds = data.items.map((item: any) => item.encodedId); // Получение массива id
            // console.log(newPublicationIds);  // проверка
            const newData = {
              publicationIds: newPublicationIds,
              searchSuccessful: true,
            };
            setPublicationIds(newData);
            navigate('/SearchResults');   // переход на страницу результатов
          })

          .catch((error) => {
            console.log(error);
          });
      };

    // =============================================================================

    return (
            <div className="search-placeholder">

                <div className="search-placeholder__block">

                    <p className="search-placeholder__block-title">ИНН компании *</p> 
                    <div className="search-placeholder__block-section">
                        <input  className="search-placeholder__block-section_input"
                                type="text"  
                                placeholder='10 цифр'
                                pattern="[0-9]{10}"
                                required/>
                        <div className="search-placeholder__block-section_invalid">
                            <p className="search-placeholder__block-section_invalid-p">
                                Введите корректные данные
                            </p>
                        </div>
                    </div>

                    <p className="search-placeholder__block-title">Тональность</p> 
                    <div>
                        <select className="search-placeholder__block-select">
                            <option value="">Любая</option>
                            <option value="option1">Позитивная</option>
                            <option value="option2">Негативная</option>
                            <option value="option3">Любая</option>
                        </select>
                    </div>

                    <p className="search-placeholder__block-title">Количество документов в выдаче *</p> 
                    
                    <div className="search-placeholder__block-section">
                        <input  className="search-placeholder__block-section_input"
                                type="text" 
                                placeholder='От 1 до 1000'/>
                        <div className="search-placeholder__block-section_invalid">
                            <p  className="search-placeholder__block-section_invalid-p">
                                Введите корректные данные
                            </p>
                        </div>
                    </div>

                    <p className="search-placeholder__block-title">Диапазон поиска *</p> 
                    <div className="search-placeholder__block-section">
                        <div className="search-placeholder__block-input" style={{display: "flex"}}>
                            <input  className="search-placeholder__block-section_input" type="text" />
                            <input  className="search-placeholder__block-section_input" type="text" />
                        </div>
                        <div className="search-placeholder__block-section_invalid">
                            <p  className="search-placeholder__block-section_invalid-p"
                            style={{marginLeft: "88px"}}>
                                Введите корректные данные
                            </p>
                        </div>
                    
                    </div>
                    


                </div>
                <div className="search-placeholder__block">
                    <div className='search-placeholder__block_checkbox-text'>
                        <input type="checkbox" id="myCheckbox" />
                        <label htmlFor="myCheckbox">Признак максимальной полноты</label>
                    </div>
                    <div className='search-placeholder__block_checkbox-text'>
                        <input type="checkbox" id="myCheckbox" />
                        <label htmlFor="myCheckbox">Упоминания в бизнес-контексте</label>
                    </div>
                    <div className='search-placeholder__block_checkbox-text'>
                        <input type="checkbox" id="myCheckbox" />
                        <label htmlFor="myCheckbox">Главная роль в публикации</label>
                    </div>
                    <div className='search-placeholder__block_checkbox-text'>
                        <input type="checkbox" id="myCheckbox" />
                        <label htmlFor="myCheckbox">Публикации только с риск-факторами</label>
                    </div>
                    <div className='search-placeholder__block_checkbox-text'>
                        <input type="checkbox" id="myCheckbox" />
                        <label htmlFor="myCheckbox">Включать технические новости рынков</label>
                    </div>
                    <div className='search-placeholder__block_checkbox-text'>
                        <input type="checkbox" id="myCheckbox" />
                        <label htmlFor="myCheckbox">Включать анонсы и календари</label>
                    </div>
                    <div className='search-placeholder__block_checkbox-text'>
                        <input type="checkbox" id="myCheckbox" />
                        <label htmlFor="myCheckbox">Включать сводки новостей</label>
                    </div>
                    <div className='search-placeholder__block_button'>
                    <button onClick={handleSearch}>Поиск</button>
                        <p>* Обязательные к заполнению поля</p>
                    </div>
                    
                </div>
            </div>
            
    );
}


export default SearchPlaceholder;
