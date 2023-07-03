import React from 'react';
import './search_placeholder.css';


function SearchPlaceholder() {
    return (
            <div className="search-placeholder">
                <div className="search-placeholder__block">
                    <p>ИНН компании *</p> 
                    <input type="text"  placeholder='10 цифр'/>
                    <p>Тональность</p> 
                    <input type="text"/>
                    <p>Количество документов в выдаче *</p> 
                    <input type="text" placeholder='От 1 до 1000'/>
                    <p>Диапазон поиска *</p> 
                    <div>
                        <input type="text" />
                        <input type="text" />
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
                        <button>Поиск</button>
                        <p>* Обязательные к заполнению поля</p>
                    </div>
                    
                </div>
            </div>
            
    );
}

export default SearchPlaceholder;
