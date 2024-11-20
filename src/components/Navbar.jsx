import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className='bg-gray-900 text-white flex font-bold text-xl justify-between p-9'>
      <Link to="/">Home</Link>
      {user ? (
        <div className='space-x-7 flex '>
          <Link  to="/create-blog" >
          <img  className="h-10 w-10" src="/add_blue.webp" />
          </Link>
          <Link  to="/profile">Profile</Link>
          <a onClick={handleLogout}>Logout</a>
        </div>
      ) : (
        <div className='space-x-7'>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
