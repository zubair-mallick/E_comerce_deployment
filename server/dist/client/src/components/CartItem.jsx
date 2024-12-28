import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
const CartItem = ({ cartItem, addToCartHandler, removeFromCartHandler }) => {
    const { productid, photo, name, price, quantity } = cartItem;
    return (<div className="cart-item">
        <img src={photo} alt={name}/>
        <article>
          <Link to={`/product/${productid}`}>{name}</Link>
          <span>₹{price}</span>
        </article>

        <div>
          <button onClick={() => removeFromCartHandler(cartItem)}>-</button>
          <p>{quantity}</p>
          <button onClick={() => addToCartHandler(cartItem)}>+</button>
        </div>

        <button onClick={() => removeFromCartHandler({ ...cartItem, quantity: 0 })}><FaTrash /></button>

    </div>);
};
export default CartItem;
