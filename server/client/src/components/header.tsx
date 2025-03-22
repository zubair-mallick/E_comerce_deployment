import { useState, useRef, useEffect } from 'react';
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { User } from '../types/types';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth } from '../firebase';

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const logoutHandler = async () => {
    console.log('\x1b[34m%s\x1b[0m', `logged out`);

    try {
      await signOut(auth);
      toast.success('Signed out successfully');
      setIsOpen(false);
    } catch (error) {
      toast.error(error as string);
    }
  };

  // Close dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="header">
        
      <Link to="/" onClick={() => setIsOpen(false)}>HOME</Link>
      <Link to="/search" onClick={() => setIsOpen(false)}><FaSearch /></Link>
      <Link to="/cart" onClick={() => setIsOpen(false)}><FaShoppingBag /></Link>

      {user?._id ? (
        <>
          <button onClick={() => setIsOpen(prev => !prev)}>
            <FaUser />
          </button>
          {isOpen && (
            <dialog ref={dialogRef} open>
              <div>
                {user.role === 'admin' && (
                  <Link to="/admin/dashboard" onClick={() => setIsOpen(false)}>Admin</Link>
                )}
                <Link to="/orders" onClick={() => setIsOpen(false)}>Orders</Link>
                <button onClick={logoutHandler}>
                  <FaSignOutAlt />
                </button>
              </div>
            </dialog>
          )}
        </>
      ) : (
        <Link to="/login"><FaSignInAlt /></Link>
      )}
    </nav>
  );
};

export default Header;
