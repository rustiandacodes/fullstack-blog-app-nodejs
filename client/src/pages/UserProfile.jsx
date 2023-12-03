import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { GeneralContext } from '../context/GeneralContext';
import profileImg from '../../assets/user.png';
import FormChangePass from '../components/FormChangePass';
import FormUpdateProfile from '../components/FormUpdateProfile';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const { setPopUpChangePassword, popUpChangePassword, popUpUpdateProfile, setPopUpUpdateProfile } = useContext(GeneralContext);
  const navigate = useNavigate();
  const baseImgUrl = import.meta.env.VITE_BASE_URL + '/uploads/';

  !user ? navigate('/login') : null;

  return (
    <div className="relative container h-screen mx-auto py-40">
      {popUpChangePassword ? <FormChangePass id={user._id} /> : null}
      {popUpUpdateProfile ? <FormUpdateProfile /> : null}

      {!!user && (
        <div className="md:max-w-md w-full mx-auto flex flex-col gap-4 border p-8 rounded-xl">
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
      <div className=" flex flex-col md:flex-row gap-3 justify-center items-center py-10 text-white font-semibold cursor-pointer" onClick={() => setPopUpUpdateProfile(true)}>
        <div className="bg-sky-500 border-2 border-sky-500 p-3 md:w-48 w-full text-center rounded-md">Edit Profile</div>
        <div className=" text-sky-500 border-2 border-sky-500 p-3 md:w-48 w-full text-center rounded-md" onClick={() => setPopUpChangePassword(true)}>
          Change Password
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
