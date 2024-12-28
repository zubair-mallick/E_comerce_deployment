import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useProductDetailsQuery, useUpdateProductMutation, useDeleteProductMutation } from "../../../redux/api/productAPI";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
const Productmanagement = () => {
    const { user } = useSelector((state) => state.userReducer);
    const params = useParams();
    const navigate = useNavigate();
    const { data, isLoading, error } = useProductDetailsQuery(params.id);
    const { photo, category, name, price, stock } = data?.product || {
        photo: "",
        category: "",
        name: "",
        price: 0,
        stock: 0,
        _id: "",
    };
    const [priceUpdate, setPriceUpdate] = useState(undefined);
    const [stockUpdate, setStockUpdate] = useState(undefined);
    const [nameUpdate, setNameUpdate] = useState(name);
    const [categoryUpdate, setCategoryUpdate] = useState(category);
    const [photoUpdate, setPhotoUpdate] = useState(photo);
    const [photoFile, setPhotoFile] = useState();
    const [preverror, setPrevError] = useState(null);
    // Mutations
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const changeImageHandler = (e) => {
        const file = e.target.files?.[0];
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setPhotoUpdate(reader.result);
                    setPhotoFile(file);
                }
            };
        }
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (nameUpdate)
            formData.set("name", nameUpdate);
        if (priceUpdate)
            formData.set("price", priceUpdate.toString());
        if (stockUpdate !== undefined)
            formData.set("stock", stockUpdate.toString());
        if (photoFile)
            formData.set("photo", photoFile);
        if (categoryUpdate)
            formData.set("category", categoryUpdate);
        try {
            const res = await updateProduct({
                formData,
                userId: user?._id,
                productId: data?.product._id,
            });
            if (res.error) {
                toast.error("Failed to update product.");
            }
            else {
                toast.success("Product updated successfully!");
            }
        }
        catch (error) {
            toast.error("An error occurred while updating the product.");
        }
    };
    const deleteHandler = async () => {
        try {
            const res = await deleteProduct({
                userId: user?._id,
                productId: data?.product._id,
            });
            if (res.error) {
                toast.error("Failed to delete product.");
            }
            else {
                toast.success("Product deleted successfully!");
                navigate("/admin/product");
            }
        }
        catch (error) {
            toast.error("An error occurred while deleting the product.");
        }
    };
    useEffect(() => {
        if (data) {
            setNameUpdate(data.product.name);
            setPriceUpdate(data.product.price);
            setStockUpdate(data.product.stock);
            setPhotoUpdate(data.product.photo);
            setCategoryUpdate(data.product.category);
        }
        if (error) {
            const statusCode = error.status; // Assuming 'status' contains the HTTP status code
            if (statusCode === 404 || statusCode === 400) {
                toast.error("Product not found.");
                navigate("/404");
                return;
            }
            const currentError = error.data.message;
            if (preverror !== currentError) {
                toast.error(currentError);
                setPrevError(currentError); // Update previous error state
            }
        }
    }, [data, error, preverror]);
    return (<div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (<div className="skeleton-loader">
            <Skeleton height={200} width={400} className="skeleton-img"/>
            <Skeleton height={30} width={800} className="skeleton-text"/>
            <Skeleton height={30} width={850} className="skeleton-text"/>
            <Skeleton height={30} width={800} className="skeleton-text"/>
          </div>) : (<>
            <section>
              <strong>ID - {params.id ? params.id : "loading..."}</strong>
              <img src={photo} alt="Product"/>
              <p>{name}</p>
              {stock > 0 ? (<span className="green">{stock} Available</span>) : (<span className="red"> Not Available</span>)}
              <h3>₹{price}</h3>
            </section>
            <article>
              <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <form onSubmit={submitHandler}>
                <h2>Manage</h2>
                <div>
                  <label>Name</label>
                  <input type="text" placeholder={name || "Name"} value={nameUpdate} onChange={(e) => setNameUpdate(e.target.value)}/>
                </div>
                <div>
                  <label>Price</label>
                  <input type="number" placeholder={price === 0 ? "Price" : price.toString()} value={priceUpdate === undefined ? "" : priceUpdate} onChange={(e) => setPriceUpdate(Number(e.target.value))}/>
                </div>
                <div>
                  <label>Stock</label>
                  <input type="number" placeholder={stock === 0 ? "Stock" : stock.toString()} value={stockUpdate === undefined ? "" : stockUpdate} onChange={(e) => setStockUpdate(Number(e.target.value))}/>
                </div>
                <div>
                  <label>Category</label>
                  <input type="text" placeholder={category || "e.g., laptop, camera etc."} value={categoryUpdate} onChange={(e) => setCategoryUpdate(e.target.value)}/>
                </div>
                <div>
                  <label>Photo</label>
                  <input type="file" onChange={changeImageHandler}/>
                </div>
                {photoUpdate && <img src={photoUpdate} alt="New Image"/>}
                <button type="submit">Update</button>
              </form>
            </article>
          </>)}
      </main>
    </div>);
};
export default Productmanagement;
