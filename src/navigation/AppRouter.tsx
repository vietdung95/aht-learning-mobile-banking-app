import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getAuthRoutes } from '../authentication/routes';
import Dashboard from '../dashboard/Dashboard';
import AccountProfile from '../accounts/AccountProfile';
import NfcPaymentPage from '../payment/NfcPaymentPage';
import QrPaymentPage from '../payment/QrPaymentPage';
import PaymentHistoryPage from '../payment/PaymentHistoryPage';
import InvestmentPage from '../investments/InvestmentPage';
import TransferPage from '../transfer/TransferPage';
import NotificationPage from '../notification/NotificationPage';
import SupportPage from '../support/SupportPage';

const AppRouter = ({ isAuthenticated, handleLoginSuccess }: { isAuthenticated: boolean, handleLoginSuccess: (token: string) => void }) => (
  <BrowserRouter>
    <Routes>
      {getAuthRoutes(handleLoginSuccess).map((r) => (
        <Route key={r.path} path={r.path} element={r.element} />
      ))}
      <Route
        path="/"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      <Route
        path="/profile"
        element={isAuthenticated ? <AccountProfile /> : <Navigate to="/login" />} />
      <Route
        path="/nfc-payment"
        element={isAuthenticated ? <NfcPaymentPage /> : <Navigate to="/login" />} />
      <Route
        path="/qr-payment"
        element={isAuthenticated ? <QrPaymentPage /> : <Navigate to="/login" />} />
      <Route
        path="/payment-history"
        element={isAuthenticated ? <PaymentHistoryPage /> : <Navigate to="/login" />} />
      <Route
        path="/investments"
        element={isAuthenticated ? <InvestmentPage /> : <Navigate to="/login" />} />
      <Route
        path="/transfer"
        element={isAuthenticated ? <TransferPage /> : <Navigate to="/login" />} />
      <Route
        path="/notifications"
        element={isAuthenticated ? <NotificationPage /> : <Navigate to="/login" />} />
      <Route
        path="/support"
        element={isAuthenticated ? <SupportPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
