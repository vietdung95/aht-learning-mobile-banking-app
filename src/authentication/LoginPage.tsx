import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { mockLogin } from './authService';

const isBiometricAvailable = true; // Giả lập có vân tay/FaceID

const LoginPage = ({ handleLoginSuccess }: { handleLoginSuccess?: (token: string) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await mockLogin(username, password);
    if (res.success) {
      handleLoginSuccess?.(res.token ?? '');
      navigate('/');
    } else {
      setError(res.message ?? 'Có lỗi xảy ra');
    }
  };

  const handleBiometricLogin = () => {
    // Giả lập xác thực vân tay/FaceID thành công
    setTimeout(() => {
      handleLoginSuccess?.('biometric-token');
      navigate('/');
    }, 800);
  };

  return (
    <div className="auth-container">
      <h2>Đăng nhập</h2>
      <form className="auth-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Số điện thoại hoặc Email"
          className="auth-input"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="auth-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="auth-btn">Đăng nhập</button>
      </form>
      {isBiometricAvailable && (
        <button className="auth-btn" style={{marginTop:8,background:'#388e3c'}} onClick={handleBiometricLogin}>
          Đăng nhập bằng vân tay/FaceID
        </button>
      )}
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      <div className="auth-links">
        <a href="#" onClick={() => navigate('/forgot-password')}>Quên mật khẩu?</a>
        <a href="#" onClick={() => navigate('/register')}>Đăng ký tài khoản mới</a>
      </div>
    </div>
  );
};

export default LoginPage;
