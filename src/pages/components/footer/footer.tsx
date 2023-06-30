import React from 'react';
import './footer.css';
import logoFooter from "./logo_footer.png"

function Footer() {
    return (
        <div className="footer">
            <a href="/"><img src={logoFooter} alt="" /></a>
            
            <div className="footer__contact">
                <p>г. Москва, Цветной б-р, 40</p>
                <p>+7 495 771 21 11</p>
                <p>info@skan.ru</p>
                <br />
                <p>Copyright. 2022</p>
            </div>
        </div>
    );
}

export default Footer;









