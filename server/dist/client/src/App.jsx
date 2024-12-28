import { onAuthStateChanged } from "firebase/auth";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/Loader.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Header from "./components/header.tsx";
import { auth } from "./firebase.ts";
import { getUser } from "./redux/api/userAPI.ts";
import { makeUserExist, makeUserNotExist } from "./redux/reducer/userReducer.ts";
const Login = lazy(() => import("./pages/login.tsx"));
const Home = lazy(() => import("./pages/Home.tsx"));
const Search = lazy(() => import("./pages/Search.tsx"));
const Cart = lazy(() => import("./pages/Cart.tsx"));
const Shipping = lazy(() => import("./pages/shipping.tsx"));
const Orders = lazy(() => import("./pages/Orders.tsx"));
const OrderDetails = lazy(() => import("./pages/orderDetails.tsx"));
const Checkout = lazy(() => import("./pages/checkout.tsx"));
//admin Routes import start
const Dashboard = lazy(() => import("./pages/admin/dashboard.tsx"));
const Products = lazy(() => import("./pages/admin/products.tsx"));
const Customers = lazy(() => import("./pages/admin/customers.tsx"));
const Transaction = lazy(() => import("./pages/admin/transaction.tsx"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts.tsx"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts.tsx"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts.tsx"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon.tsx"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch.tsx"));
const Toss = lazy(() => import("./pages/admin/apps/toss.tsx"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct.tsx"));
const ProductManagement = lazy(() => import("./pages/admin/management/productmanagement.tsx"));
const TransactionManagement = lazy(() => import("./pages/admin/management/transactionmanagement.tsx"));
const NotFound = lazy(() => import("./pages/notFound.tsx"));
//admin routes import end
const App = () => {
    const { user, loading } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                //  console.log("loggedin")
                const data = await getUser(user.uid);
                // console.log(data)
                dispatch(makeUserExist(data.user));
            }
            else {
                console.log("not loggedin");
                dispatch(makeUserNotExist());
            }
        });
    }, [dispatch]);
    return (loading ? <Loader /> : <Router>
    <Header user={user}/>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/search" element={<Search />}/>
        
       
       {/* not logged in route */}
       <Route path="/login" element={<ProtectedRoute isAuthenticated={user ? false : true} redirect="/">
        <Login></Login>
       </ProtectedRoute>}/>

        {/* login user routes */}
       <Route element={<ProtectedRoute isAuthenticated={user ? true : false}/>}>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/shipping" element={<Shipping />}/>
            <Route path="/orders" element={<Orders />}/>
            <Route path="/order/:id" element={<OrderDetails />}/>
            <Route path="/pay" element={<Checkout />}/>

       </Route>



        
       {/*admin routes*/}
        <Route element={<ProtectedRoute isAuthenticated={user ? true : false} adminOnly={true} isAdmin={user && (user.role === "Admin" || user.role === "admin") ? true : false}/>}>
          <Route path="/admin/dashboard" element={<Dashboard />}/>
          <Route path="/admin/product" element={<Products />}/>
          <Route path="/admin/customer" element={<Customers />}/>
          <Route path="/admin/transaction" element={<Transaction />}/>
          {/* Charts */}
          <Route path="/admin/chart/bar" element={<Barcharts />}/>
          <Route path="/admin/chart/pie" element={<Piecharts />}/>
          <Route path="/admin/chart/line" element={<Linecharts />}/>
          {/* Apps */}
          <Route path="/admin/app/coupon" element={<Coupon />}/>
          <Route path="/admin/app/stopwatch" element={<Stopwatch />}/>
          <Route path="/admin/app/toss" element={<Toss />}/>

          {/* Management */}
          <Route path="/admin/product/new" element={<NewProduct />}/>

          <Route path="/admin/product/:id" element={<ProductManagement />}/>

          <Route path="/admin/transaction/:id" element={<TransactionManagement />}/>
        </Route>
        
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </Suspense>
    <Toaster position="bottom-center"/>
  </Router>);
};
export default App;
