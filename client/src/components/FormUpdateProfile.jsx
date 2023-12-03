import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { GeneralContext } from '../context/GeneralContext';
import { UserContext } from '../context/UserContext';

const FormUpdateProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const { setPopUpUpdateProfile, refMenu } = useContext(GeneralContext);
  const { user } = useContext(UserContext);

  console.log(name, email, phone, address);

  useEffect(() => {
    const setAllData = () => {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
    };
    setAllData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put('/update-profile', {
        name,
        email,
        phone,
        address,
      })
      .then(({ data }) => setMessage(data));
  };

  return (
    <div className="fixed right-0 left-0 top-0 bottom-0">
      <div className="w-full h-full bg-gray-600 absolute opacity-75 -z-10"></div>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="relative min-w-[700px] rounded-xl shadow h-fit bg-white mx-auto" ref={refMenu}>
          <div className="absolute right-2 top-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8" onClick={() => setPopUpUpdateProfile(false)}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className="p-5 py-14 flex flex-col gap-5">
            <div>
              <p className="font-bold mb-2">Name</p>
              <input className="input-style border-2 rounded-lg" type="text" placeholder="Enter your name here..." value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <p className="font-bold mb-2">Email</p>
              <input className="input-style border-2 rounded-lg" type="email" placeholder="Enter your email here..." value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <p className="font-bold mb-2">Phone Number</p>
              <input className="input-style border-2 rounded-lg" type="text" placeholder="Enter your phone number here..." value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div>
              <p className="font-bold mb-2">Address</p>
              <input className="input-style border-2 rounded-lg" type="text" placeholder="Enter your address here..." value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <button className="w-full bg-sky-500 py-3 text-white font-bold rounded-md">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormUpdateProfile;
