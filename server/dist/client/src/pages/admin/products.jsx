import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ProductTableSkeleton from "../../components/productTableSkeleton";
const columns = [
    {
        Header: "Photo",
        accessor: "photo",
    },
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Price",
        accessor: "price",
    },
    {
        Header: "Stock",
        accessor: "stock",
    },
    {
        Header: "Action",
        accessor: "action",
    },
];
const Products = () => {
    const [rows, setRows] = useState([]);
    const { user } = useSelector((state) => state.userReducer);
    const { data, isLoading, isError, error, isSuccess } = useAllProductsQuery(user?._id);
    useEffect(() => {
        // console.log({message:data?.message})
        if (isSuccess)
            toast.success(data.message, { position: 'bottom-center' });
        if (isError)
            toast.error(error.data.message);
    }, [error, isSuccess]);
    useEffect(() => {
        if (data)
            setRows(data.products.map(i => ({
                photo: <img src={i.photo}></img>,
                name: i.name,
                price: i.price,
                stock: i.stock,
                action: <Link to={`/admin/product/${i._id}`}>Manage</Link>
            })));
        // console.log(rows)
    }, [data]);
    const Table = TableHOC(columns, rows, "dashboard-product-box", "Products", rows.length > 6)();
    return (<div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <ProductTableSkeleton /> : Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>);
};
export default Products;
