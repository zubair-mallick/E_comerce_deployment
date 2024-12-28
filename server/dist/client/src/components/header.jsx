import { useState } from 'react';
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth } from '../firebase';
const header = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const logoutHandler = async () => {
        console.log('\x1b[34m%s\x1b[0m', `loggedout`);
        try {
            await signOut(auth);
            toast.success("Signed out successfully");
            setIsOpen(false);
        }
        catch (error) {
            toast.error(error);
        }
    };
    return (<nav className='header'>
         <Link to={"/"} onClick={() => setIsOpen(false)}>HOME</Link>
         <Link to={"/search"} onClick={() => setIsOpen(false)}><FaSearch /></Link>
         <Link to={"/cart"} onClick={() => setIsOpen(false)}><FaShoppingBag /></Link>

        {user?._id ? (<>
         <button onClick={() => setIsOpen(prev => !prev)}> 
            <FaUser /> 
        </button>
        <dialog open={isOpen}>
            <div>
                {user.role === "admin" && (<Link to={"/admin/dashboard"}>Admin</Link>)}
                <Link to={"/orders"}>
                    Orders
                </Link>
                <button onClick={logoutHandler}>
                    <FaSignOutAlt />
                </button>
            </div>
        </dialog>
         </>)
            :
                <Link to={"/login"}> <FaSignInAlt /></Link>}
   </nav>);
};
export default header;
