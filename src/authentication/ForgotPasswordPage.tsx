import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { mockForgotPassword } from './authService';

const ForgotPasswordPage = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!username) {
      setError('Vui lòng nhập số điện thoại hoặc email');
      return;
    }
    const res = await mockForgotPassword(username);
    if (res.success) {
      setSuccess('Đã gửi mã OTP thành công! Chuyển về đăng nhập...');
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setError(res.message ?? 'Có lỗi xảy ra');
    }
  };

  return (
    <div className="auth-container">
      <h2>Quên mật khẩu</h2>
      <form className="auth-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Số điện thoại hoặc Email"
          className="auth-input"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit" className="auth-btn">Gửi mã OTP</button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
      <div className="auth-links">
        <a href="#" onClick={() => navigate('/login')}>Quay lại đăng nhập</a>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
