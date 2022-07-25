import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Header } from '../components';
import PizzaModal from '../components/Pizza/PizzaModal';

const MainLayout: React.FC = () => {
  return (
    <div className="app">
      <div className="container">
        <Header />
        <PizzaModal />
        <ToastContainer
          position="bottom-right"
          toastStyle={{ backgroundColor: 'black' }}
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
