import React from 'react';
import { RegFormProvider } from './RegFormProvider';
import { Outlet } from 'react-router-dom';

const RegFormLayout = () => (
  <RegFormProvider>
    <Outlet />
  </RegFormProvider>
);

export default RegFormLayout;