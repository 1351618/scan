import React, { useState, useContext, useEffect } from "react";
import "./search_placeholder.css";
import { AuthContext } from "../../../AuthContext";
import { PublicationIdsContext } from "../../../AuthContext";
import { useNavigate } from "react-router-dom";

function SearchPlaceholder() {
  const { authInfo, setAuthInfo } = useContext(AuthContext);
  const { setPublicationIds } = useContext(PublicationIdsContext);
  const navigate = useNavigate();
  const [inputINN, setInputINN] = useState("");
  const [inputQuantity, setInputQuantity] = useState("");
  const [inputPeriod, setInputPeriod] = useState({
    startDate: "",
    validStartDate: "",
    endDate: "",
    validEndDate: "",
  });

  const [validINN, setValidINN] = useState(false);
  const [valid1_1000, setValid1_1000] = useState(false);
  const [validInputPeriod, setValidInputPeriod] = useState<boolean | null>(
    null
  );
  const [searchButtonState, setSearchButtonState] = useState(false);

  // =========================== тестовый запрос поисеа ===================================
  // /api/v1/objectsearch

  const handleSearch = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authInfo.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"],
        issueDateInterval: {
          startDate: "2019-01-01T00:00:00+03:00",
          endDate: "2022-08-31T23:59:59+03:00",
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [
              {
                type: "company",
                inn: "7710137066", // Замените на нужный ИНН
              },
            ],
            onlyMainRole: true,
            tonality: "any",
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
        similarMode: "none",
        limit: 1000,
        sortType: "sourceInfluence",
        sortDirectionType: "desc",
      }),
    };

    fetch(
      "https://gateway.scan-interfax.ru/api/v1/objectsearch",
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Ошибка сети");
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
        navigate("/SearchResults"); // переход на страницу результатов
      })

      .catch((error) => {
        console.log(error);
      });
  };
  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  // ========================== обработчики импутов =========================================
  // ------- инн ----------
  const handleInputINN = (event: any) => {
    const inputValue = event.target.value;

    if (inputValue.length === 10) {
      setValidINN(false);
      setInputINN(inputValue);
    } else {
      setValidINN(true);
    }
    // console.log(inputValue);
  };
  // ----- 1-1000 ------
  const handleInputQuantity = (event: any) => {
    const inputValue = event.target.value;
    if (inputValue >= 1 && inputValue <= 1000) {
      setValid1_1000(false);
      setInputQuantity(inputValue);
    } else {
      setValid1_1000(true);
    }
  };

  // -----  период -------
  const inputStartDate = (event: any) => {
    const inputValue = event.target.value;
    // Проверка формата даты с помощью регулярного выражения
    const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
    const isValidFormat = dateRegex.test(inputValue);
    setInputPeriod((prevInputPeriod) => ({
      ...prevInputPeriod,
      startDate: inputValue,
      validStartDate: isValidFormat ? "" : "invalid",
    }));
  };
  const inputEndtDate = (event: any) => {
    const inputValue = event.target.value;
    // Проверка формата даты с помощью регулярного выражения
    const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
    const isValidFormat = dateRegex.test(inputValue);
    setInputPeriod((prevInputPeriod) => ({
      ...prevInputPeriod,
      endDate: inputValue,
      validEndDate: isValidFormat ? "" : "invalid",
    }));
  };
  // валидность даты

  useEffect(() => {
    if (
      inputPeriod.startDate !== "" &&
      inputPeriod.endDate !== "" &&
      inputPeriod.startDate >= inputPeriod.endDate
    ) {
      setValidInputPeriod(false);
    } else {
      setValidInputPeriod(true);
    }
  }, [inputPeriod.startDate, inputPeriod.endDate]);

  // отображение кнопки  && inputQuantity !== ""
  useEffect(() => {
    if (
      inputINN !== "" &&
      validINN === false &&
      inputQuantity !== "" &&
      valid1_1000 === false &&
      inputPeriod.startDate !== "" &&
      inputPeriod.validStartDate !== "invalid" &&
      inputPeriod.endDate !== "" &&
      inputPeriod.validEndDate !== "invalid" &&
      validInputPeriod !== false
    ) {
      // console.log(validInputPeriod);
      setSearchButtonState(true);
    } else {
      setSearchButtonState(false);
    }
  }, [
    inputINN,
    validINN,
    inputQuantity,
    valid1_1000,
    inputPeriod.startDate,
    inputPeriod.validStartDate,
    inputPeriod.endDate,
    inputPeriod.validEndDate,
    validInputPeriod,
  ]);

  // ================================= вывод на страницу =================================
  return (
    <div className="search-placeholder">
      <div className="search-placeholder__block block-input">
        <p className="search-placeholder__block-title">ИНН компании *</p>
        <div className="search-placeholder__block-section">
          <input
            className={`search-placeholder__block-section_input ${
              validINN ? "invalid-input" : ""
            }`}
            type="number"
            placeholder="10 цифр"
            onChange={handleInputINN}
          />
          <div className="search-placeholder__block-section_invalid">
            {validINN && (
              <p className="search-placeholder__block-section_invalid-p">
                Введите корректные данные
              </p>
            )}
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

        <p className="search-placeholder__block-title">
          Количество документов в выдаче *
        </p>
        <div className="search-placeholder__block-section">
          <input
            className={`search-placeholder__block-section_input ${
              valid1_1000 ? "invalid-input" : ""
            }`}
            type="number"
            placeholder="От 1 до 1000"
            min={1}
            max={1000}
            onChange={handleInputQuantity}
          />
          <div className="search-placeholder__block-section_invalid">
            {valid1_1000 && (
              <p className="search-placeholder__block-section_invalid-p">
                Введите корректные данные
              </p>
            )}
          </div>
        </div>

        <p className="search-placeholder__block-title">Диапазон поиска *</p>
        <div className="search-placeholder__block-section">
          <div className="search-placeholder__block-input bottom-input">
            <input
              className={`search-placeholder__block-section_input ${
                inputPeriod.validStartDate !== "" ? "invalid-input" : ""
              }`}
              type="text"
              placeholder="01.01.2023"
              name="startDate"
              onChange={inputStartDate}
            />
            <input
              className={`search-placeholder__block-section_input ${
                inputPeriod.validEndDate === "invalid" ? "invalid-input" : ""
              }`}
              type="text"
              placeholder="01.01.2023"
              name="endDate"
              onChange={inputEndtDate}
            />
          </div>
          <div className="search-placeholder__block-section_invalid">
            {validInputPeriod === false && (
              <p className="search-placeholder__block-section_invalid-p bottom">
                Введите корректные данные
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="search-placeholder__block block-checkbox">
        <div className="search-placeholder__block_checkbox-text">
          <input type="checkbox" id="myCheckbox" />
          <label htmlFor="myCheckbox">Признак максимальной полноты</label>
        </div>
        <div className="search-placeholder__block_checkbox-text">
          <input type="checkbox" id="myCheckbox" />
          <label htmlFor="myCheckbox">Упоминания в бизнес-контексте</label>
        </div>
        <div className="search-placeholder__block_checkbox-text">
          <input type="checkbox" id="myCheckbox" />
          <label htmlFor="myCheckbox">Главная роль в публикации</label>
        </div>
        <div className="search-placeholder__block_checkbox-text">
          <input type="checkbox" id="myCheckbox" />
          <label htmlFor="myCheckbox">Публикации только с риск-факторами</label>
        </div>
        <div className="search-placeholder__block_checkbox-text">
          <input type="checkbox" id="myCheckbox" />
          <label htmlFor="myCheckbox">
            Включать технические новости рынков
          </label>
        </div>
        <div className="search-placeholder__block_checkbox-text">
          <input type="checkbox" id="myCheckbox" />
          <label htmlFor="myCheckbox">Включать анонсы и календари</label>
        </div>
        <div className="search-placeholder__block_checkbox-text">
          <input type="checkbox" id="myCheckbox" />
          <label htmlFor="myCheckbox">Включать сводки новостей</label>
        </div>
        <div className="search-placeholder__block_button">
          <button
            className={`button_search ${searchButtonState ? "" : "inactive"}`}
            onClick={handleSearch}
            disabled={!searchButtonState}
          >
            Поиск
          </button>
          <p>* Обязательные к заполнению поля</p>
        </div>
      </div>
    </div>
  );
}

export default SearchPlaceholder;
