import arrowDown from "../../../public/images/arrow_down.svg"
import addToBasketIcon from "../../../public/images/add_to_basket.svg"
import wishlist from "../../../public/images/heart.svg"
import './GoodsCardStyles.scss'
import {Link} from "react-router-dom";

export default function GoodsCard({
                                      id,
                                      count,
                                      image,
                                      header,
                                      text,
                                      price,
                                      addDelProduct,
                                      addToBasket,
                                      deleteGoods,
                                      basket
                                  }) {

    const onCounterClick = (bool) => {
        addDelProduct(bool, id)
    }
    const deleteItem = () => {
        deleteGoods(id)
    }
    const addToBasketClick = () => {
        addToBasket(id)
    }
    return (
        <div className={`card_container${basket ? '_basket' : ''}`}>
            {!basket && <div className="card_purchase_container">
                <img onClick={addToBasketClick} className="icon_add_to_basket" src={addToBasketIcon} alt=""/>
                <img className="icon_add_to_wishlist" src={wishlist} alt=""/>
            </div>}
            <img className={`product_image${basket ? '_basket' : ''}`} src={image} alt="Icon"/>
            <div className={`product_info_container${basket ? '_basket' : ''}`}>
                <span className={`title${basket ? '_basket' : ''}`}>{header}</span>
                <p className={`description${basket ? '_basket' : ''}`}>{text}</p>
                <span className={`price${basket ? '_basket' : ''}`}>{price}</span>
                {basket &&
                    <div className='card_buttons'>
                        <span className='favorites'> <Link to="/404">Избранные</Link></span>
                        <span className='delete' onClick={deleteItem}>Удалить</span>
                    </div>
                }
            </div>
            {basket && <div className='goods_counter_container'>
                <span className='counter_number'>{count}</span>
                <div className='goods_arrow_container'>
                    <img onClick={() => onCounterClick(true)} className="arrow_up" src={arrowDown} alt='arrow'/>
                    <img onClick={() => onCounterClick(false)} className="arrow_down" src={arrowDown} alt='arrow'/>
                </div>
            </div>
            }
        </div>
    )
}
