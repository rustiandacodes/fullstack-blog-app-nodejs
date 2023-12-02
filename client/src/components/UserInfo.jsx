import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { GeneralContext } from '../context/GeneralContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserInfo = ({}) => {
  const { user, setUser } = useContext(UserContext);
  const { showMenuPop, setShowMenuPop, refOne } = useContext(GeneralContext);

  const logout = () => {
    axios.post('/logout');
    setUser(null);
  };

  const handleMenu = () => {
    showMenuPop === false ? setShowMenuPop(true) : setShowMenuPop(false);
  };

  return (
    <>
      {/* user menu */}
      <div className="relative flex gap-2 items-center justify-around py-2 px-2 md:px-3 rounded-full shadow cursor-pointer" onClick={handleMenu} ref={refOne}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <div className="hidden sm:block">{!!user && <span className="capitalize">{user.name}</span>}</div>
        <div className={`${showMenuPop === false ? 'hidden' : 'absolute'} p-3 bg-white shadow top-14 -left-7 sm:left-0 -right-7 sm:right-0 rounded-lg`}>
          <div className="flex flex-col gap-2 text-sm">
            <Link to={'/profile'}>Profile</Link>
            <Link to={'/write'}>Write</Link>
            <Link to={'/dashboard'}>Dashboard</Link>
            <span className="font-bold" onClick={logout}>
              Logout
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
