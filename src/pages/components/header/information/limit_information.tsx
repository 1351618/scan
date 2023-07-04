import React, { useContext } from 'react';
import './limit_information.css';
import load_spin from "./load_spin.png"
import { AuthContext } from '../../../../AuthContext';

function ImitInformation() {

    const { authInfo, setAuthInfo } = useContext(AuthContext);

    return (
        <div className="limit-information"
        style={{ display: authInfo.isAuthenticated ? '' : 'none' }}
        >

            <div className="limit-information__content"
                style={{display: "none"}}
                >
                <p>Использовано компаний 
                    <span className="limit-information__content_used">
                        34
                    </span> 
                </p>
                <p>Лимит по компаниям 
                    <span className="limit-information__content_limit">
                        100
                    </span>
                </p>
            </div>

            <div className="limit-information__load"
                // style={{display: "none"}}
                >
                    <img className="limit-information__load rotate-animation" src={load_spin} alt="" />
            </div>


        </div>
    );
}

export default ImitInformation;