import React, { useState } from 'react';
import './OtpModal.css';

const OtpModal = ({ open, onClose, onVerify }: { open: boolean, onClose: () => void, onVerify: (otp: string) => void }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '123456') {
      onVerify(otp);
      setOtp('');
      setError('');
    } else {
      setError('Mã OTP không đúng');
    }
  };

  if (!open) return null;
  return (
    <div className="otp-modal-bg">
      <div className="otp-modal">
        <h3>Xác thực OTP</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="otp-input"
            placeholder="Nhập mã OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            maxLength={6}
          />
          <button type="submit" className="otp-btn">Xác nhận</button>
        </form>
        {error && <div className="otp-error">{error}</div>}
        <button className="otp-close" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default OtpModal;
