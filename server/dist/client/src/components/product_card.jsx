import { FaPlus } from "react-icons/fa";
const product_card = ({ productId, price, name, photo, stock, handler }) => {
    return (<div className="product-card">
       <img src={photo} alt={name}/> 
       <p>{name}</p>
       <span>{price}</span>

       <div>
          <button onClick={() => handler({ productId, price, name, photo, stock, quantity: 1 })}>
            <FaPlus />
          </button>
       </div>
   </div>);
};
export default product_card;
