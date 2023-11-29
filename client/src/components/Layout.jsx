import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const Layout = () => {
  return (
    <div>
      <Header />
      <div className="px-10 md:px-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
