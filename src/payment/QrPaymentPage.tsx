import React, { useState } from 'react';
import './QrPayment.css';
import OtpModal from '../components/OtpModal';

const merchants = [
  { id: 1, name: 'Cửa hàng tiện lợi A', amount: 120000, qr: 'QR123A' },
  { id: 2, name: 'Siêu thị B', amount: 350000, qr: 'QR456B' },
  { id: 3, name: 'Cafe C', amount: 45000, qr: 'QR789C' },
];

const QrPaymentPage = () => {
  const [qrCode, setQrCode] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);

  const handlePay = () => {
    setShowOtp(true);
  };

  const handleOtpVerify = (otp: string) => {
    setShowOtp(false);
    setOtpSuccess(true);
    setSuccess('Thanh toán QR thành công!');
    setTimeout(() => setOtpSuccess(false), 2000);
  };

  return (
    <div className="qr-container">
      <h2>Thanh toán QR</h2>
      <input
        className="qr-input"
        placeholder="Nhập hoặc quét mã QR..."
        value={qrCode}
        onChange={e => setQrCode(e.target.value)}
        disabled={processing}
      />
      <button className="qr-btn" onClick={handlePay} disabled={processing}>
        {processing ? 'Đang xử lý...' : 'Thanh toán QR'}
      </button>
      <OtpModal open={showOtp} onClose={() => setShowOtp(false)} onVerify={handleOtpVerify} />
      {otpSuccess && <div className="qr-success">Xác thực OTP thành công!</div>}
      {success && <div className="qr-success">{success}</div>}
      {error && <div className="qr-error">{error}</div>}
      <div className="qr-demo-list">
        <b>Demo QR code:</b>
        {merchants.map(m => (
          <div key={m.id} className="qr-demo-item">
            <span>{m.name}:</span> <span className="qr-demo-code">{m.qr}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QrPaymentPage;
