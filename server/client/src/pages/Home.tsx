import { Link } from "react-router-dom";
import Productcard from "../components/product_card";
import { useLatestProductsQuery } from "../redux/api/productAPI";

import { Slider } from "6pp";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaAnglesDown } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { SkeletonCard } from "../components/Loader";
import { addToCart } from "../redux/reducer/cartReducer";
import { cartItem } from "../types/types";

import { FaMoneyCheck } from "react-icons/fa";
import { GiDeliveryDrone } from "react-icons/gi";
import { VscWorkspaceTrusted } from "react-icons/vsc";

const videoCover = "https://videos.pexels.com/video-files/4008542/4008542-uhd_1440_2732_25fps.mp4"

const clients = [
  {
    src: "https://img.freepik.com/free-vector/gradient-hub-logo-template_23-2149847151.jpg?t=st=1742640026~exp=1742643626~hmac=f307955796941af145342ac43ad15471fc99ee36653a6e7d2ca083a1c1024c46&w=900",
    alt: "rando",
  },
  {
    src: "https://img.freepik.com/premium-vector/creative-leaf-shapes-logo-unique-colorful-color-transitions-clean-energy-zero-carbon-logo-unique_396016-3594.jpg?w=900",
    alt: "leaf",
  },
  {
    src: "https://img.freepik.com/free-vector/colorful-building-blockslike-vector-logo-japanese-boys-festival_8130-2417.jpg?t=st=1742640195~exp=1742643795~hmac=137500037bed7a115bf7a06a2800201be92dbb99073b8bbcbbd01a42956cd746&w=1380",
    alt: "japan",
  },
  {
    src: "https://img.freepik.com/free-vector/gradient-hub-logo-template_23-2149847142.jpg?t=st=1742640107~exp=1742643707~hmac=80b8e092e0a83869e8c2964d8eaa2f929e7509136e2a0d4814bd72941f3cc5d6&w=900",
    alt: "cute image",
  },
  {
    src: "https://img.freepik.com/free-psd/gradient-abstract-logo_23-2150689642.jpg?t=st=1742640136~exp=1742643736~hmac=27654cb9cbda2d926003a1c90710ee2619ac216b9a7ab2a245c6898412dcb9f3&w=900",
    alt: "square",
  },{
    src: "https://img.freepik.com/free-vector/gradient-hub-logo-template_23-2149847151.jpg?t=st=1742640026~exp=1742643626~hmac=f307955796941af145342ac43ad15471fc99ee36653a6e7d2ca083a1c1024c46&w=900",
    alt: "rando",
  },
  {
    src: "https://img.freepik.com/premium-vector/creative-leaf-shapes-logo-unique-colorful-color-transitions-clean-energy-zero-carbon-logo-unique_396016-3594.jpg?w=900",
    alt: "leaf",
  },
  {
    src: "https://img.freepik.com/free-vector/colorful-building-blockslike-vector-logo-japanese-boys-festival_8130-2417.jpg?t=st=1742640195~exp=1742643795~hmac=137500037bed7a115bf7a06a2800201be92dbb99073b8bbcbbd01a42956cd746&w=1380",
    alt: "japan",
  },
 
];
const banners = [
  "https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg",
  "https://t4.ftcdn.net/jpg/06/22/74/79/360_F_622747997_4s5nw9y2WG3LJyQ5iRF4KRGLbySGRd82.jpg",
];
const categories = [
  "clothes",
  "Electronics",
  "Furniture",
  "Miscellaneous",
  "Shoes",
  "camera",
  "laptop"
]

const services = [
  {
    icon: <GiDeliveryDrone />,
    title: "VERY FAST DELIVERY",
    description: "we deliver very fast",
  },
  {
    icon: <FaMoneyCheck />,
    title: "SECURE PAYMENT",
    description: "100% secure payment",
  },
  {
    icon: <VscWorkspaceTrusted />,
    title: "100% TRUSTWORTHY",
    description: "No headache with refunds and returns",
  },
];

// Import Swiper styles
const Home = () => {

  type CustomErrorType = {
    success: boolean;
    data:{
      message: string;
      statusCode: number;
    }
  };
 

  const { data, isLoading, isError, error } = useLatestProductsQuery("");

// Safely typecast the error to `CustomErrorType`
  const typedError = error as CustomErrorType | undefined;

  const dispatch = useDispatch()

  const addToCartHandler = (cartItem:cartItem) => {
    if(cartItem.stock<1) return toast.error("out of Stock");
    dispatch(addToCart(cartItem));
  };

  const coverMessage =
  "love it or hate it but never regret it.".split(
    " "
  );

  return (
    <div className="home">
      <section></section>
      <div>
        <aside>
          <h1>Categories</h1>
          <ul>
            {categories.map((i) => (
              <li key={i}>
                <Link to={`/search?category=${i.toLowerCase()}`}>{i}</Link>
              </li>
            ))}
          </ul>
        </aside>
        <Slider autoplay autoplayDuration={2000} showNav={false} images={banners} />
      </div>



      <h1>
        Latest products
        <Link to="/search" className="findmore"> More </Link>
      </h1>
      <main>
        {isLoading? (
       <div className="skeleton-container">
         {Array.from({ length: 4 }).map((_, index) => (
           <SkeletonCard  key={index} />
         ))}
       </div>
        ) : isError ? (
          <p style={{ color: "red" }}>
            {typedError?.data?.message || "An error occurred. Please try again."}
          </p>
        ) : (
          data?.products.map(product => (
            <Productcard
              key={product._id}
              productId={product._id}
              name={product.name}
              price={product.price}
              stock={product.stock}
              handler={addToCartHandler}
              photos={product.photos}
            />
          ))
        )}
      </main>
      <article className="cover-video-container">
        <div className="cover-video-overlay"></div>
        <video autoPlay loop muted src={videoCover} />
        <div className="cover-video-content">
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Fashion
          </motion.h2>
          {coverMessage.map((el, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: i / 10,
              }}
              key={i}
            >
              {el}{" "}
            </motion.span>
          ))}
        </div>
        <motion.span
          animate={{
            y: [0, 10, 0],
            transition: {
              duration: 1,
              repeat: Infinity,
            },
          }}
        >
          <FaAnglesDown />
        </motion.span>
      </article>

      <article className="our-clients">
        <div>
          <h2>Our Clients</h2>
          <div>
            {clients.map((client, i) => (
              <motion.img
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: i / 20,
                    ease: "circIn",
                  },
                }}
                src={client.src}
                alt={client.alt}
                key={i}
              />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: -100 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                delay: clients.length / 20,
              },
            }}
          >
            Trusted By 100+ Companies in 30+ countries
          </motion.p>
        </div>
      </article>

      <hr
        style={{
          backgroundColor: "rgba(0,0,0,0.1)",
          border: "none",
          height: "1px",
        }}
      />

      <article className="our-services">
        <ul>
          {services.map((service, i) => (
            <motion.li
              initial={{ opacity: 0, y: -100 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: i / 20,
                },
              }}
              key={service.title}
            >
              <div>{service.icon}</div>
              <section>
                <h3>{service.title}Y</h3>
                <p>{service.title}</p>
              </section>
            </motion.li>
          ))}
        </ul>
      </article>


    </div>
  );
};

export default Home;


