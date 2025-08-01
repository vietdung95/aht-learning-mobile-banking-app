import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css';

const mockUser = {
  name: 'Nguyen Van A',
  email: 'user1@example.com',
  phone: '0901234567',
  id: '0123456789',
  kyc: true,
  balance: 12000000,
};

const AccountProfile = () => {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({ ...mockUser });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    if (!user.name || !user.email || !user.phone) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    setSuccess('Cập nhật thông tin thành công!');
    setEdit(false);
  };

  return (
    <div className="account-container">
      <h2>Thông tin tài khoản</h2>
      <div className="account-info">
        {edit ? (
          <form onSubmit={handleSave} className="account-form">
            <label>Họ tên:
              <input name="name" value={user.name} onChange={handleChange} />
            </label>
            <label>Email:
              <input name="email" value={user.email} onChange={handleChange} />
            </label>
            <label>Số điện thoại:
              <input name="phone" value={user.phone} onChange={handleChange} />
            </label>
            <button type="submit" className="account-btn">Lưu</button>
            <button type="button" className="account-btn" style={{background:'#aaa',marginLeft:8}} onClick={()=>setEdit(false)}>Hủy</button>
          </form>
        ) : (
          <>
            <p><b>Họ tên:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Số điện thoại:</b> {user.phone}</p>
            <p><b>Số giấy tờ:</b> {user.id}</p>
            <p><b>KYC:</b> {user.kyc ? 'Đã xác thực' : 'Chưa xác thực'}</p>
            <p><b>Số dư:</b> <span style={{color:'#1976d2',fontWeight:600}}>{user.balance.toLocaleString()} VND</span></p>
            <button className="account-btn" style={{marginTop:12}} onClick={()=>navigate('/payment-history')}>Xem lịch sử giao dịch</button>
          </>
        )}
      </div>
      {!edit && <button className="account-btn" onClick={()=>setEdit(true)}>Cập nhật thông tin</button>}
      {success && <div style={{color:'green',marginTop:8}}>{success}</div>}
      {error && <div style={{color:'red',marginTop:8}}>{error}</div>}
    </div>
  );
};

export default AccountProfile;
