import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const RutaProtegida = ({ children }) => {
  const { user, esAdmin } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (esAdmin) return <Navigate to="/administrarListas" />;
  return children;
};

export default RutaProtegida;
