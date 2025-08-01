import React, { useState } from 'react';
import './NfcPayment.css';
import OtpModal from '../components/OtpModal';

const merchants = [
  { id: 1, name: 'Cửa hàng tiện lợi A', amount: 120000 },
  { id: 2, name: 'Siêu thị B', amount: 350000 },
  { id: 3, name: 'Cafe C', amount: 45000 },
];

const NfcPaymentPage = () => {
  const [selected, setSelected] = useState<number|null>(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [pendingPayment, setPendingPayment] = useState<{id:number,name:string,amount:number}|null>(null);

  // Giả lập quét NFC
  const handleNfcPay = () => {
    if (selected !== null) {
      setPendingPayment(merchants.find(m=>m.id===selected) || null);
      setShowOtp(true);
    } else {
      setError('Vui lòng chọn điểm thanh toán');
    }
  };
  const handleOtpVerify = (otp: string) => {
    setShowOtp(false);
    setOtpSuccess(true);
    setTimeout(()=>setOtpSuccess(false), 2000);
    setSuccess('Thanh toán thành công qua NFC!');
  };

  return (
    <div className="nfc-container">
      <h2>Thanh toán 1 chạm (NFC)</h2>
      <div className="nfc-list">
        {merchants.map(m => (
          <div
            key={m.id}
            className={`nfc-merchant${selected===m.id?' selected':''}`}
            onClick={()=>setSelected(m.id)}
          >
            <b>{m.name}</b> <span>{m.amount.toLocaleString()} VND</span>
          </div>
        ))}
      </div>
      <button className="nfc-btn" onClick={handleNfcPay} disabled={processing}>
        {processing ? 'Đang xử lý...' : 'Chạm để thanh toán NFC'}
      </button>
      <OtpModal open={showOtp} onClose={()=>setShowOtp(false)} onVerify={handleOtpVerify} />
      {otpSuccess && <div className="nfc-success">Xác thực OTP thành công!</div>}
      {success && <div className="nfc-success">{success}</div>}
      {error && <div className="nfc-error">{error}</div>}
    </div>
  );
};

export default NfcPaymentPage;
