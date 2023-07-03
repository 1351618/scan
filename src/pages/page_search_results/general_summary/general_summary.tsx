import React from 'react';
import './general_summary.css';
import LeftArrow from "./icons_chevron_left.png"
import RightArrow from "./icons_chevron_right.png"



function GeneralSummary() {
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
