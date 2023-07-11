import React, {useState, useContext} from 'react';
import './our_rates.css';
import lemp_img from "./lemp.png"
import arrow_img from "./arrow.png"
import laptop_img from "./laptop.png"
import { AuthContext } from '../../../AuthContext'; 


function OurRates() {

    const [rate, setRate] = useState(0);
    const { authInfo, setAuthInfo } = useContext(AuthContext);
// =========================== запрос о тарифе ==========================================
    // /api/v1/account/balance
    const requestRate = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${authInfo.token}`
        }
    };
    fetch ('https://gateway.scan-interfax.ru/api/v1/account/balance', requestRate)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Ошибка сети');
        }
        })
        .then(data => {
        // console.log(data);
        setRate(data.searchTermCost)
        })
        .catch(error => {
        // console.log(error);
        });
// ======================================================================================
    return (
        <div className='our-rates__element'>
            <p className="our-rates__element-p">наши тарифы</p>
            <div className="our-rates__element_block">
                {/* блок 1 */}
                <div className="our-rates__element_block-element" 
                style={{border: rate === 1 ? "4px solid #FFB64F": "none"}}>
                    <div className="our-rates__element_block-element_header"
                    style={{backgroundColor:"#FFB64F"}}>
                        <h3>Beginner</h3>
                        <span>Для небольшого исследования</span>
                        <img src={lemp_img} alt="" />
                    </div>
                    <div className="our-rates__element_block-element_main">
                        <div className="our-rates__element_block-element_main_Current-tariff"
                        style={{display: rate === 1 ? "": "none"}}>
                            <p >Текущий тариф</p>
                        </div>
                        <span className="our-rates__element_block-element_main_current">799 ₽</span>
                        <span className="our-rates__element_block-element_main_past">1 200 ₽</span>
                        <p className="our-rates__element_block-element_main_p">или 150 ₽/мес. при рассрочке на 24 мес.</p>
                        <p className="our-rates__element_block-element_main_ul">В тариф входит:</p>
                        <ul>
                            <li>Безлимитная история запросов</li>
                            <li>Безопасная сделка</li>
                            <li>Поддержка 24/7</li>
                        </ul>
                    </div>
                    <button className="our-rates__element_block-element_button-more"
                    style={{display:rate === 1 ? "none":""}}>
                        Подробнее
                    </button>
                    <button className="our-rates__element_block-element_button-go-account"
                    style={{display:rate === 1 ? "":"none"}}>
                        Перейти в личный кабинет
                    </button>
                </div>
                {/* блок 2 */}
                <div className="our-rates__element_block-element"
                style={{border: rate === 2 ? "4px solid #7CE3E1": "none"}}>
                    <div className="our-rates__element_block-element_header"
                    style={{backgroundColor:"#7CE3E1"}}>
                        <h3>Pro</h3>
                        <span>Для HR и фрилансеров</span>
                        <img src={arrow_img} alt="" />
                    </div>
                    <div className="our-rates__element_block-element_main">
                        <div className="our-rates__element_block-element_main_Current-tariff"
                        style={{display: rate === 2 ? "": "none"}}>
                            <p>Текущий тариф</p>
                        </div>
                        <span className="our-rates__element_block-element_main_current">1 299 ₽</span>
                        <span className="our-rates__element_block-element_main_past">2 600 ₽</span>
                        <p className="our-rates__element_block-element_main_p">или 279 ₽/мес. при рассрочке на 24 мес.</p>
                        <p className="our-rates__element_block-element_main_ul">В тариф входит:</p>
                        <ul>
                            <li>Все пункты тарифа Beginner</li>
                            <li>Экспорт истории</li>
                            <li>Рекомендации по приоритетам</li>
                        </ul>
                    </div>
                    <button className="our-rates__element_block-element_button-more"
                    style={{display:rate === 2 ? "none":""}}>
                        Подробнее
                    </button>
                    <button className="our-rates__element_block-element_button-go-account"
                    style={{display:rate === 2 ? "":"none"}}>
                        Перейти в личный кабинет
                    </button>
                </div>
                {/* блок 3 */}
                <div className="our-rates__element_block-element"
                style={{border: rate === 3 ? "4px solid #000000": "none"}}>
                    <div className="our-rates__element_block-element_header"
                    style={{backgroundColor:"#000000", color:"#ffffff" }}>
                        <h3>Business</h3>
                        <span>Для корпоративных клиентов</span>
                        <img src={laptop_img} alt="" />
                    </div>
                    <div className="our-rates__element_block-element_main">
                        <div className="our-rates__element_block-element_main_Current-tariff"
                        style={{display: rate === 3 ? "": "none"}}>
                            <p>Текущий тариф</p>
                        </div>
                        <span className="our-rates__element_block-element_main_current">2 379 ₽</span>
                        <span className="our-rates__element_block-element_main_past">3 700 ₽</span>
                        <p className="our-rates__element_block-element_main_p">&nbsp;</p>
                        <p className="our-rates__element_block-element_main_ul">В тариф входит:</p>
                        <ul>
                            <li>Все пункты тарифа Pro</li>
                            <li>Безлимитное количество запросов</li>
                            <li>Приоритетная поддержка</li>
                        </ul>
                    </div>
                    <button className="our-rates__element_block-element_button-more"
                    style={{display:rate === 3 ? "none":""}}>
                        Подробнее
                    </button>
                    <button className="our-rates__element_block-element_button-go-account"
                    style={{display:rate === 3 ? "":"none"}}>
                        Перейти в личный кабинет
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OurRates;
