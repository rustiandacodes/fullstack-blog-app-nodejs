import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserInfo = ({}) => {
  const [menu, setMenu] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    axios.post('/logout');
    setUser(null);
  };

  const handleMenu = () => {
    menu === false ? setMenu(true) : setMenu(false);
  };

  return (
    <>
      {/* user menu */}
      <Link to={!user ? '/login' : ''} className="relative flex gap-2 items-center justify-around py-2 px-2 md:px-3 rounded-full shadow cursor-pointer" onClick={() => handleMenu()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <div className="hidden sm:block">{!!user && <span className="capitalize">{user.name}</span>}</div>
        <div className={`${menu === false ? 'hidden' : 'absolute'} p-3 bg-white shadow top-14 -left-7 sm:left-0 -right-7 sm:right-0 rounded-lg`}>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link>Profile</Link>
            </li>
            <li>
              <Link>Write</Link>
            </li>
            <li>
              <Link>Dashboard</Link>
            </li>
            <li>
              <span className="font-bold" onClick={logout}>
                Logout
              </span>
            </li>
          </ul>
        </div>
      </Link>
    </>
  );
};

export default UserInfo;
