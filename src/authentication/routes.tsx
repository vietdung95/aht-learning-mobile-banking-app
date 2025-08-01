import React from 'react';
import LoginPage from '../authentication/LoginPage';
import RegisterPage from '../authentication/RegisterPage';
import ForgotPasswordPage from '../authentication/ForgotPasswordPage';
import KycPage from '../kyc/KycPage';

export const getAuthRoutes = (handleLoginSuccess?: (token: string) => void) => [
  { path: '/login', element: <LoginPage handleLoginSuccess={handleLoginSuccess} /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/kyc', element: <KycPage /> },
];
