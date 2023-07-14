import React, { useContext, useState, useRef, useEffect } from "react";
import "./general_summary.css";
import LeftArrow from "./icons_chevron_left.png";
import RightArrow from "./icons_chevron_right.png";
import { AuthContext } from "../../../AuthContext";
import load_spin from "./load_spin.png";
import HistogramsData from "./data.json";

function GeneralSummary() {
  const authInfo = useContext(AuthContext); // Получаем значение контекста
  // console.log(authInfo.authInfo.token)
  // console.log(HistogramsData.data); // временная заглушка - так как невозможно получить данные с сервера
  // получаем ссылку на ширину контейнера
  const collectionHistogramRef = useRef<HTMLDivElement | null>(null);
  // переменная с шириной 1го блока в контенере в пикселях
  const widthOneBlock = 120;
  // значение с какого элемента нужно отображать блоки
  const [startShowingBlocks, setStartShowingBlocks] = useState(0);
  // количество  отображаемых блоков
  const [width, setWidth] = useState(0);

  const requestObjectSearchHistograms = () => {
    const url =
      "https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms"; // URL эндпоинта
    const apiKey = authInfo.authInfo.token;

    // запрос на сервер ==============================================================
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
        endDate: "2023-07-11T12:32:38.202Z",
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
          tonality: "any",
          onlyWithRiskFactors: false,
        },
      },
    };

    // сам запрос
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        // console.log(response)
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Ошибка запроса");
        }
      })
      .then((responseData) => {
        // console.log('Response Data:', responseData); // Вывод данных ответа сервера
        const data = responseData.data; // Получение массива данных
        // console.log('Data:', data); // Вывод массива данных
        if (data.length > 0) {
          const firstEntry = data[0]; // Получение первой записи из массива данных
          // console.log('First Entry:', firstEntry); // Вывод первой записи
          const histogramData = firstEntry.data; // Получение массива данных гистограммы
          // console.log('Histogram Data:', histogramData); // Вывод массива данных гистограммы
          if (histogramData.length > 0) {
            const firstHistogramEntry = histogramData[0]; // Получение первой записи из массива данных гистограммы
            const date = firstHistogramEntry.date; // Получение значения даты
            const value = firstHistogramEntry.value; // Получение значения
            // console.log('Date:', date);
            // console.log('Value:', value);
          }
        }
      })
      .catch((error) => {
        // console.error('Ошибка запроса:', error);
      });
  };

  useEffect(() => {
    requestObjectSearchHistograms();
  }, []);
  // ххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххх

  // обработка даты  ==================================================
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).padStart(4, "0");
    return `${day}.${month}.${year}`;
  }

  // функция для формерования блоков ====================================
  function collectionHistograms() {
    const displayedBlocks = HistogramsData.data.slice(
      startShowingBlocks,
      startShowingBlocks + width
    );

    return displayedBlocks.map((item, index) => (
      <div
        className="general_summary__table-block-content"
        key={index}
        style={{ width: window.innerWidth > 768 ? widthOneBlock : "100%" }}
      >
        <p>{formatDate(item.data[0].date)}</p>
        <p>{item.data[0].value}</p>
        <p>{item.data[1].value}</p>
      </div>
    ));
  }

  // получаем ширин контейнера и количество отображаемых элементов =========================
  useEffect(() => {
    const handleResize = () => {
      if (collectionHistogramRef.current) {
        const width = Math.floor(
          collectionHistogramRef.current.offsetWidth / widthOneBlock
        );
        // console.log("количество блоков:", width);
        setWidth(width);
      }
    };
    handleResize(); // Вызываем обработчик при монтировании компонента
    window.addEventListener("resize", handleResize); // Добавляем слушатель события resize
    return () => {
      window.removeEventListener("resize", handleResize); // Удаляем слушатель при размонтировании компонента
    };
  }, []);

  // переключение отображаемых элементов с кнопок =================
  const pressinLeft = () => {
    if (startShowingBlocks > 0) {
      setStartShowingBlocks(startShowingBlocks - 1);
      // console.log(startShowingBlocks);
    }
  };
  const pressingRight = () => {
    if (startShowingBlocks < HistogramsData.data.length - width) {
      setStartShowingBlocks(startShowingBlocks + 1);
      // console.log(startShowingBlocks);
    }
  };

  // выводим на страницу  =============================================================================================================
  return (
    <div className="general-summary">
      <p className="general-summary_p">Общая сводка</p>
      <span>Найдено 4 221 вариантов</span>
      <div className="general_summary__table">
        <button className="button-arrow" onClick={pressinLeft}>
          <img src={LeftArrow} alt="" />
        </button>
        <div className="general_summary__table-block">
          <div className="general_summary__table-block-main">
            <p>Период</p>
            <p>Всего</p>
            <p>Риски</p>
          </div>
          {/* отображаем или контент или загрузку ============  */}
          {HistogramsData.data.length !== 0 ? (
            <div className="collectionHistogram" ref={collectionHistogramRef}>
              {/* {collectionHistograms(GeneralSumDataGSD.lenGSD)} */}
              {collectionHistograms()}
            </div>
          ) : (
            <div className="collectionHistogram collectionHistogram-load">
              <img src={load_spin} alt="" />
            </div>
          )}
        </div>
        <button className="button-arrow" onClick={pressingRight}>
          <img src={RightArrow} alt="" />
        </button>
      </div>
    </div>
  );
}

export default GeneralSummary;
