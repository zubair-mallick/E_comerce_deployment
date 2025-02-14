import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Skeleton } from "../../components/Loader";
import { useAllUsersQuery, useDeleteUserMutation, } from "../../redux/api/userAPI";
import { responseToast } from "../../utils/features";
const columns = [
    {
        Header: "Avatar",
        accessor: "avatar",
    },
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Gender",
        accessor: "gender",
    },
    {
        Header: "Email",
        accessor: "email",
    },
    {
        Header: "Role",
        accessor: "role",
    },
    {
        Header: "Action",
        accessor: "action",
    },
];
const Customers = () => {
    const { user } = useSelector((state) => state.userReducer);
    const { isLoading, data, isError, error } = useAllUsersQuery(user?._id);
    const [rows, setRows] = useState([]);
    const [deleteUser] = useDeleteUserMutation();
    const deleteHandler = async (userId) => {
        const res = await deleteUser({ userId, adminUserId: user?._id });
        responseToast(res, null, "");
    };
    if (isError) {
        const err = error;
        toast.error(err.data.message);
    }
    useEffect(() => {
        if (data)
            setRows(data.users.map((i) => ({
                avatar: (<img style={{
                        borderRadius: "50%",
                    }} src={i.photo} alt={i.name}/>),
                name: i.name,
                email: i.email,
                gender: i.gender,
                role: i.role,
                action: (<button onClick={() => deleteHandler(i._id)}>
              <FaTrash />
            </button>),
            })));
    }, [data]);
    const Table = TableHOC(columns, rows, "dashboard-product-box", "Customers", rows.length > 6)();
    return (<div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton length={20}/> : Table}</main>
    </div>);
};
export default Customers;
