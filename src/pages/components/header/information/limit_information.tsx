import React, {useState, useContext } from 'react';
import './limit_information.css';
import load_spin from "./load_spin.png"
import { AuthContext } from '../../../../AuthContext';

function ImitInformation() {

    const { authInfo, setAuthInfo } = useContext(AuthContext);
    const [companyLimit, setCompanyLimit] = useState(0);
    const [usedCompanyCount, setUsedCompanyCount] = useState(0);
    const [dataInformation, setDataInformation] = useState(false);
// ============================= запрос о лимитах компаний =====================================================================
//  /api/v1/account/info 

    const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authInfo.token}`  // Добавляем префикс "Bearer" перед токеном
        }
    };
        
        fetch('https://gateway.scan-interfax.ru/api/v1/account/info', requestOptions)
            .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Ошибка сети');
            }
            })
            .then(data => {
            // console.log(data);
            setCompanyLimit(data.eventFiltersInfo.companyLimit)
            setUsedCompanyCount(data.eventFiltersInfo.usedCompanyCount)
            setDataInformation(true)
            })
            .catch(error => {
            // console.log(error);
            });

// ===================================================================================================
    return (
        <div className="limit-information"
        style={{ display: authInfo.isAuthenticated ? '' : 'none' }}
        >

            <div className="limit-information__content"
                style={{display: dataInformation ?"": "none"}}
                >
                    <div className="content-text">
                        <p>Использовано компаний </p>
                        <span className="limit-information__content_used">{companyLimit}</span>
                    </div>

                    <div className="content-text">
                        <p>Лимит по компаниям </p>
                        <span className="limit-information__content_limit">{usedCompanyCount}</span>
                    </div>
            </div>

            <div className="limit-information__load"
            style={{display: dataInformation ?"none": ""}}
            >
                    <img className="limit-information__load rotate-animation" src={load_spin} alt="" />
            </div>


        </div>
    );
}

export default ImitInformation;