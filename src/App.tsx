
import React, { useState } from 'react';
import AppRouter from './navigation/AppRouter';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Có thể kiểm tra localStorage hoặc token ở đây
    return !!localStorage.getItem('token');
  });

  // Hàm xử lý đăng nhập thành công
  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  // Truyền prop handleLoginSuccess cho LoginPage qua context hoặc props nếu cần
  // Ở đây sẽ dùng context đơn giản
  return <AppRouter isAuthenticated={isAuthenticated} handleLoginSuccess={handleLoginSuccess} />;
};

export default App;
