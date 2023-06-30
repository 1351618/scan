import React, { useRef, useEffect, useState } from 'react';
import './why_are_we.css';
import icons_chevron_right from "./icons_chevron_right.png";
import icons_chevron_left from "./icons_chevron_left.png";
import lens from "./lens.png"
import stopwatch from "./stopwatch.png"
import shield from "./shield.png"

// содержание карточек
const items = [
  {
    id: 1,
    image: stopwatch,
    text: 'Высокая и оперативная скорость обработки заявки',
  },
  {
    id: 2,
    image: lens,
    text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос',
  },
  {
    id: 3,
    image: shield,
    text: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству',
  },
  {
    id: 4,
    image: stopwatch,
    text: 'test-4 Высокая и оперативная скорость обработки заявки',
  },
  {
    id: 5,
    image: shield,
    text: 'test-5 Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству',
  },
];

function WhyAreWe() {
  const windowElementRef = useRef<HTMLDivElement | null>(null);
  const [visibleItems, setVisibleItems] = useState(items.slice(0, 3)); // Показывать только 3 элемента изначально
  const [startIndex, setStartIndex] = useState(0); // Индекс элемента, который должен быть первым в списке visibleItems

  useEffect(() => {
    if (windowElementRef.current !== null) {
      const windowElementWidth = windowElementRef.current.offsetWidth; // Получаем ширину элемента
      const numVisibleItems = Math.floor(windowElementWidth / 400); // Рассчитываем количество видимых элементов на основе ширины контейнера (400px - ширина элемента)

      setVisibleItems(getVisibleItems(items, startIndex, numVisibleItems)); // Обновляем видимые элементы
    }
  }, [startIndex]);

  const handleLeftArrowClick = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const handleRightArrowClick = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const getVisibleItems = (items: any, startIndex: any, numVisibleItems: any) => {
    const endIndex = (startIndex + numVisibleItems - 1) % items.length;
    if (endIndex >= startIndex) {
      return items.slice(startIndex, endIndex + 1);
    } else {
      return items.slice(startIndex).concat(items.slice(0, endIndex + 1));
    }
  };

  return (
    <div className='why-are-we'>
      <p className="why-are-we__p">Почему именно мы</p>

      <div className='why-are-we__window'>
        <button onClick={handleLeftArrowClick}><img src={icons_chevron_left} alt="" /></button>

        <div className='why-are-we__window_element' ref={windowElementRef}>
          {visibleItems.map((item) => (
            <div className='why-are-we__window_element_items' key={item.id}>
              <img className='why-are-we__window_element_img' src={item.image} alt="" />
              <span className='why-are-we__window_element_span'>{item.text}</span>
            </div>
          ))}
        </div>

        <button onClick={handleRightArrowClick}><img src={icons_chevron_right} alt="" /></button>
      </div>
    </div>
  );
}

export default WhyAreWe;