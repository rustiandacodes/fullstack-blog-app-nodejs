import UserInfo from './UserInfo';
import LoginAndRegisterButton from './LoginAndRegisterButton';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="fixed w-full shadow-sm py-8 px-10 md:px-0 bg-white z-10">
      {/* logo */}
      <Link to={'/'} className="container mx-auto flex justify-between items-center cursor-pointer">
        <div className="flex gap-3 items-center">
          <div className="bg-sky-500 w-12 h-12 flex justify-center items-center text-white">
            <span className="font-bold text-2xl">B</span>
          </div>
          <span className="text-xl hidden font-semibold md:block">Blink Media</span>
        </div>

        {/* search */}
        <div className="flex">
          <div className="flex gap-2 items-center py-2 px-3 rounded-full ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input className="p-1 outline-none bg-transparent hidden md:block w-28" type="text" placeholder="search..." />
          </div>

          {/* user info */}
          {user ? <UserInfo /> : <LoginAndRegisterButton />}
        </div>
      </Link>
    </div>
  );
};

export default Header;
