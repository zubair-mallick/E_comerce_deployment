import { Link } from "react-router-dom";
import Productcard from "../components/product_card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { SkeletonCard } from "../components/Loader";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
// Import Swiper styles
const Home = () => {
    const { data, isLoading, isError, error } = useLatestProductsQuery("");
    // Safely typecast the error to `CustomErrorType`
    const typedError = error;
    const dispatch = useDispatch();
    const addToCartHandler = (cartItem) => {
        if (cartItem.stock < 1)
            return toast.error("out of Stock");
        dispatch(addToCart(cartItem));
    };
    return (<div className="home">
      <section></section>
      <h1>
        Latest products
        <Link to="/search" className="findmore"> More </Link>
      </h1>
      <main>
        {isLoading ? (<div className="skeleton-container">
         {Array.from({ length: 4 }).map((_, index) => (<SkeletonCard key={index}/>))}
       </div>) : isError ? (<p style={{ color: "red" }}>
            {typedError?.data?.message || "An error occurred. Please try again."}
          </p>) : (data?.products.map(product => (<Productcard key={product._id} productId={product._id} name={product.name} price={product.price} stock={product.stock} handler={addToCartHandler} photo={product.photo}/>)))}
      </main>
    </div>);
};
export default Home;
