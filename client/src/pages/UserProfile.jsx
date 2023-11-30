import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import profileImg from '../../assets/user.png';

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const baseImgUrl = import.meta.env.VITE_BASE_URL + '/uploads/';

  return (
    <div className="container h-screen mx-auto py-40">
      {!!user && (
        <div className="max-w-md mx-auto flex flex-col gap-4 border p-8 rounded-xl">
          <div className="flex justify-center">
            <img className="w-44" src={!user.photo ? profileImg : baseImgUrl + user.photo[0]} alt="profile-image" />
          </div>
          <div className="flex gap-9">
            <p className="font-bold w-1/4">Name</p>
            <p className="capitalize">: {user.name}</p>
          </div>
          <div className="flex gap-9">
            <p className="font-bold w-1/4">Phone</p>
            <p>: {user.phone}</p>
          </div>
          <div className="flex gap-9">
            <p className="font-bold w-1/4">Email</p>
            <p>: {user.email}</p>
          </div>
          <div className="flex gap-9">
            <p className="font-bold w-1/4">Adrress</p>
            <p>: {user.address}</p>
          </div>
        </div>
      )}
      <div className="flex gap-5 justify-center py-10 text-white font-semibold cursor-pointer">
        <span className="bg-sky-500 p-3 rounded-md">Edit Profile</span>
        <span className="bg-red-500 p-3 rounded-md">Change Password</span>
      </div>
    </div>
  );
};

export default UserProfile;
