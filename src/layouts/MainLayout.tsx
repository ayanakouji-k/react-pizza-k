import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../components';
import PizzaModal from '../components/Pizza/PizzaModal';

const MainLayout: React.FC = () => {
  return (
    <div className="app">
      <div className="container">
        <Header />
        <PizzaModal />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
