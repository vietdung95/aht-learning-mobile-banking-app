import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { mockRegister } from './authService';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!username || !password || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp');
      return;
    }
    const res = await mockRegister(username, password);
    if (res.success) {
      setSuccess('Đăng ký thành công! Chuyển về trang đăng nhập...');
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setError(res.message ?? 'Có lỗi xảy ra');
    }
  };

  return (
    <div className="auth-container">
      <h2>Đăng ký tài khoản</h2>
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
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          className="auth-input"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="auth-btn">Đăng ký</button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
      <div className="auth-links">
        <a href="#" onClick={() => navigate('/login')}>Đã có tài khoản? Đăng nhập</a>
      </div>
    </div>
  );
};

export default RegisterPage;
