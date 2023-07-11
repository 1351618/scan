import React, {useContext, useState, useEffect} from 'react';
import './general_summary.css';
import LeftArrow from "./icons_chevron_left.png"
import RightArrow from "./icons_chevron_right.png"
import { AuthContext } from '../../../AuthContext';



function GeneralSummary() {
    const authInfo = useContext(AuthContext); // Получаем значение контекста
    // console.log(authInfo.authInfo.token)

    const requestObjectSearchHistograms = () => {
        const url = 'https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms'; // URL эндпоинта
        const apiKey = authInfo.authInfo.token;
      
        // Тело запроса в формате JSON
        const requestBody = {
          intervalType: "month",
          histogramTypes: ["totalDocuments", "riskFactors"],
          sortType: "issueDate",
          limit: "5",
          sortDirectionType: "asc",
          similarMode: "none",
          issueDateInterval: {
            startDate: "2023-07-11T12:32:38.202Z",
            endDate: "2023-07-11T12:32:38.202Z"
          },
          attributeFilters: {
              excludeTechNews: true,
              excludeAnnouncements: true,
              excludeDigests: true,
          },
          searchContext: {
              targetSearchEntitiesContext: {
                  targetSearchEntities: [
                      {
                          type: "company",
                      },
                  ],
                  onlyMainRole: true,
                  tonality: 'any',
                  onlyWithRiskFactors: false,
              },
          },
        };

      
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(requestBody),
        })
          .then((response) => {
            console.log(response)
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Ошибка запроса');
            }
          })
          .then((responseData) => {
            console.log('Response Data:', responseData); // Вывод данных ответа сервера
            const data = responseData.data; // Получение массива данных
            console.log('Data:', data); // Вывод массива данных
            if (data.length > 0) {
              const firstEntry = data[0]; // Получение первой записи из массива данных
              console.log('First Entry:', firstEntry); // Вывод первой записи
              const histogramData = firstEntry.data; // Получение массива данных гистограммы
              console.log('Histogram Data:', histogramData); // Вывод массива данных гистограммы
              if (histogramData.length > 0) {
                const firstHistogramEntry = histogramData[0]; // Получение первой записи из массива данных гистограммы
                const date = firstHistogramEntry.date; // Получение значения даты
                const value = firstHistogramEntry.value; // Получение значения
                console.log('Date:', date);
                console.log('Value:', value);
              }
            }
          })
          .catch((error) => {
            console.error('Ошибка запроса:', error);
          });
      };

      useEffect(() => {
        requestObjectSearchHistograms();
      }, [])
      
    




    return (
        <div className="general-summary">
            <p className="general-summary_p">Общая сводка</p>
            <span>Найдено 4 221 вариантов</span>
            <div className="general_summary__table">
                <img src={LeftArrow} alt="" />
                <div className="general_summary__table-block">
                    <div className="general_summary__table-block-main">
                        <p>Период</p>
                        <p>Всего</p>
                        <p>Риски</p>
                    </div>
                    <div className="general_summary__table-block-content">
                        <p>Период</p>
                        <p>Всего</p>
                        <p>Риски</p>
                    </div>
                    <div className="general_summary__table-block-content">
                        <p>Период</p>
                        <p>Всего</p>
                        <p>Риски</p>
                    </div>
                </div>
                <img src={RightArrow} alt="" />
            </div>
        </div>
    );
}

export default GeneralSummary;
