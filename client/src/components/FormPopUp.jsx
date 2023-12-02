import React, { useState, useContext, useEffect, useRef } from 'react';
import { GeneralContext } from '../context/GeneralContext';

const FormPopUp = () => {
  const [lastPassword, setLastPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const { setPopUp, refOne } = useContext(GeneralContext);

  return (
    <div className="fixed right-0 left-0 top-0 bottom-0">
      <div className="w-full h-full bg-gray-600 absolute opacity-75 -z-10"></div>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="relative min-w-[900px] rounded-xl shadow h-fit bg-white mx-auto" ref={refOne}>
          <div className="absolute right-2 top-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8" onClick={() => setPopUp(false)}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <form className="p-5 py-14 flex flex-col gap-5">
            <div>
              <p className="font-bold mb-2">Last Password</p>
              <input className="input-style border-2 rounded-lg" type="password" placeholder="********" onChange={(e) => setLastPassword(e.target.value)} />
            </div>
            <div>
              <p className="font-bold mb-2">New Password</p>
              <input className="input-style border-2 rounded-lg" type="password" placeholder="********" onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <button className="w-full bg-sky-500 py-3 text-white font-bold rounded-md">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPopUp;
