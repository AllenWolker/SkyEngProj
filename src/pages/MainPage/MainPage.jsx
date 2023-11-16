import React, {useContext, useEffect, useState} from "react";
import './MainPageStyles.scss';
import GoodsCard from "../../components/Card/GoodsCard";
import {ProductsContext} from "../../App.jsx";

const MainPage = () => {
    const [filter, setFilter] = useState('expensive');
    const [productsContext, setProducts] = useContext(ProductsContext)
    const [goods, setGoods] = useState(productsContext)

    useEffect(() => {
        if (filter === 'expensive') {
            setGoods(goods.sort((a, b) => parseInt(a.price.replace(/\D/g, '')) > parseInt(b.price.replace(/\D/g, '')) ? 1 : -1));
        } else {
            setGoods(goods.sort((a, b) => parseInt(a.price.replace(/\D/g, '')) > parseInt(b.price.replace(/\D/g, '')) ? -1 : 1));
        }
    }, [filter, goods]);

    function onChange(e) {
        e.preventDefault();
        setFilter(e.target.value)
    }

    const addToBasket = (id) => {
        goods.find(item => item.id === id && item.count < 5 ? item.count += 1 : '');
        setProducts(goods)
    }
    return (
        <>
            <div className="filter_container">
                <select className="filter" onChange={onChange} value={filter} name="filter">
                    <option value="cheap">Порядок: сперва дешевле</option>
                    <option value="expensive">Порядок: сперва дороже</option>
                </select>
            </div>

            <div className="goods">
                {goods.map((prod, i) => {
                    return (
                        <ProductsContext.Provider key={i.price + Math.random()} value={[productsContext, setProducts]}>
                            <GoodsCard
                                id={prod.id}
                                count={prod.count}
                                image={prod.image}
                                addToBasket={addToBasket}
                                header={prod.header}
                                text={prod.text}
                                price={prod.price}
                                basket={false}/>
                        </ProductsContext.Provider>

                    );
                })}
            </div>
        </>
    )
}
export default MainPage;
