import './BasketStyles.scss'
import GoodsCard from "../../components/Card/GoodsCard";
import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {ProductsContext} from "../../App.jsx";

let costItems = 0

const Basket = () => {
    const [cost, setCost] = useState(0)
    const [productsContext, setProducts] = useContext(ProductsContext)
    const [goods, setGoods] = useState(productsContext)
    useEffect(() => {
        costItems = 0
        goods.forEach((item) => {
            if (item.count > 0) {
                costItems = costItems + (parseInt(item.price.replace(/\D/g, '')) * item.count)
            }
        })
        setCost(costItems)
    }, [goods])

    const clearGoods = () => {
        setGoods([]);
    }

    const deleteGoods = (id) => {
        setGoods(prevState =>
            prevState.map(item =>
                item.id === id
                    ? {...item, count: 0}
                    : item))
    }
    const addDelProduct = (bool, id) => {
        if (!bool) {
            setGoods(prevState =>
                prevState.map(item =>
                    item.id === id && item.count > 0
                        ? {...item, count: item.count - 1}
                        : item))
        } else {
            setGoods(prevState =>
                prevState.map(item =>
                    item.id === id && item.count < 5
                        ? {...item, count: item.count + 1}
                        : item))
        }

    }
    return (
        <>
            <div className="basket_body">
                <div className="basket_items">
                    <div className="points">
                        <span className="products">Товар</span>
                        <span className="quantity">Кол-во</span>
                    </div>
                    <div className="products_container">
                        {
                            goods.map((item) => {
                                if (item.count > 0) {
                                    return (
                                        <ProductsContext.Provider key={item.price + Math.random()}
                                                                  value={[productsContext, setProducts]}>
                                            <GoodsCard
                                                id={item.id}
                                                count={item.count}
                                                image={item.image}
                                                header={item.header}
                                                text={item.text}
                                                price={item.price}
                                                addDelProduct={addDelProduct}
                                                deleteGoods={deleteGoods}
                                                basket={true}
                                            />
                                        </ProductsContext.Provider>
                                    )
                                }

                            })
                        }

                    </div>
                    <div className='basket_buttons_container'>
                        <div className="clear_button" onClick={() => clearGoods()}>Очистить корзину</div>
                        <div className="shopping_button"><Link to="/">Продолжить покупки</Link></div>
                    </div>

                </div>
                <div className="basket_order">
                    <span className="basket_order_title">Оформление заказа</span>
                    <div className='basket_order_data_container'>
                        <input type="text" className="name" placeholder='Введите Имя и Фамилию'/>
                        <input type="phone" className="phone" placeholder='Введите номер телефона'/>
                        <input type="text" className="basket_delivery_address" placeholder='Введите адрес доставки'/>
                    </div>
                    <span className="basket_order_cost">Итого: <span
                        className='basket_order_price'>{cost} руб.</span></span>
                    <div className="basket_order_apply_button"><Link to="/404">Оформить заказ</Link></div>
                </div>
            </div>
        </>
    )
}
export default Basket;
