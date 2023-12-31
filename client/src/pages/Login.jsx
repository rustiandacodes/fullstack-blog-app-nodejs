import axios from 'axios';
import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/login', {
        email,
        password,
      });
      alert('Login successfull!');
      setRedirect(true);
      setUser(data);
    } catch (error) {
      alert('failed');
    }
  };

  if (redirect || user) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <div className="bg-sky-500 flex justify-center items-center h-screen">
        <div className="mx-auto sm:w-1/2 xl:w-1/4 w-[20rem] p-8 rounded-xl shadow-sm bg-white">
          <div className="flex gap-2 justify-center items-center py-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 text-sky-500">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
              />
            </svg>
            <h1 className="text-center sm:text-3xl text-2xl font-semibold text-sky-500">Welcome Back!</h1>
          </div>
          <form
            onSubmit={(e) => {
              handleLogin(e);
            }}
          >
            {/* input email */}
            <div className="text-gray-500 flex gap-2 border-b-2 my-3 items-center py-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
              </svg>
              <input type="email" className="input-style" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            {/* input password */}
            <div className="text-gray-500 flex gap-2 border-b-2 my-3 items-center py-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              <input type="password" className="input-style" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="w-full bg-sky-500 text-white py-4 mt-4 rounded-lg font-bold focus:outline-none">Login</button>
            <div className="mt-8 text-center">
              <p className="mb-2">
                Dont't have an account?{' '}
                <Link to={'/register'} className="text-sky-500 cursor-pointer font-semibold">
                  Register
                </Link>
              </p>
              <Link className="text-sky-500 cursor-pointer font-semibold">Forgot password?</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
