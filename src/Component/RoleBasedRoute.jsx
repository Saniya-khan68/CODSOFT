import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleBasedRoute = ({ children, user, allowedRoles }) => {
  if (!user || !allowedRoles.includes(user.userType)) {
    return <Navigate to="/" />;
  }
  return children;
};

export default RoleBasedRoute;
