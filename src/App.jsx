import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import React, {useState} from "react";
import './App.scss'
import MainPage from './pages/MainPage/MainPage'
import Basket from "./pages/Card/Basket.jsx";
import NoPage from "./pages/NoPage/NoPage.jsx";
import askesta from "../public/images/askesta.jpg";
import lunar from "../public/images/lunar.jpg";
import menu from "../public/images/menu.jpg";
import nastan from "../public/images/nastan.jpg";
import tatran from "../public/images/tatran.jpg";
import vilora from "../public/images/vilora.jpg";
import CatalogIcon from "../public/images/catalog.svg";
import BasketIcon from "../public/images/basket.svg";


const products = [{
    id: 0,
    count: 1,
    image: askesta,
    header: 'Диван ASKESTA',
    text: 'Благодаря защелкивающемуся механизму диван легко раскладывается в комфортную кровать',
    price: '68 000 руб.'
}, {
    id: 1,
    count: 0,
    image: lunar,
    header: 'Кресло LUNAR',
    text: 'Прекрасно переносит солнечные лучи, перепады влажности и любые осадки',
    price: '40 000 руб.'
}, {
    id: 2,
    count: 0,
    image: menu,
    header: 'Стол MENU',
    text: 'Европейский дуб - отличается особой прочностью и стабильностью.',
    price: '34 000 руб.'
}, {
    id: 3,
    count: 0,
    image: nastan,
    header: 'Шкаф Nastan',
    text: 'Мебель может быть оснащена разнообразными системами подсветки.',
    price: '80 000 руб.'
}, {
    id: 4,
    count: 0,
    image: tatran,
    header: 'Кровать TATRAN',
    text: 'Основание из полированной нержавеющей стали, придает оригинальный парящий эффект.',
    price: '120 000 руб.'
}, {
    id: 5,
    count: 0,
    image: vilora,
    header: 'Кресло VILORA',
    text: 'Мягкое и уютное, аккуратное и стильное. Упругие подушки сиденья и приятная на ощупь ткань. ',
    price: '21 000 руб.'
}]

export const ProductsContext = React.createContext(null)
export default function App() {
    const [productsContext, setProducts] = useState(products)
    return (
        <BrowserRouter basename="/">
            <div className="header">
                <span className="logo">Интерьер.</span>
                <div className="menu_container">
                    <ul className="menu">
                        <li className='phone_menu_catalog'><Link to="/"><img src={CatalogIcon} alt="catalog"/></Link>
                        </li>
                        <li className='phone_menu_basket'><Link to="/basket"><img src={BasketIcon} alt="basket"/></Link>
                        </li>
                        <li className='menu_catalog'><Link to="/">Каталог</Link></li>
                        <li className='menu_basket'><Link to="/basket">Корзина</Link></li>
                    </ul>
                </div>
            </div>
            <ProductsContext.Provider value={[productsContext, setProducts]}>
                <Routes>
                    <Route exact path="/" element={<MainPage/>}/>
                    <Route exact path="/basket" element={<Basket/>}/>
                    <Route exact path="/404" element={<NoPage/>}/>
                </Routes>
            </ProductsContext.Provider>

        </BrowserRouter>
    );
}

