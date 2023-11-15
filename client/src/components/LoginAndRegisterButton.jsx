import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const LoginAndRegisterButton = () => {
  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    menu === false ? setMenu(true) : setMenu(false);
  };
  return (
    <div className="flex justify-center items-center gap-2">
      <Link className="hidden md:block px-4 py-2 rounded-lg text-sm font-bold bg-gray-500 border-[2px] border-gray-500 text-white" to={'/login'}>
        Login
      </Link>
      <Link className="hidden md:block px-4 py-2 rounded-lg text-sm font-bold border-[2px] border-gray-500 text-gray-500" to={'/register'}>
        Register
      </Link>
      <div className="relative" onClick={() => handleMenu()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer md:hidden">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <div className={`${menu === false ? 'hidden' : 'absolute'} p-3 bg-white shadow top-10 -left-7 sm:left-0 -right-7 sm:right-0 rounded-lg`}>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link to={'/login'}>Login</Link>
            </li>
            <li>
              <Link to={'/register'}>Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginAndRegisterButton;
