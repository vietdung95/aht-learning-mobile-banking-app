import React, { useState } from 'react';
import './Savings.css';
import OtpModal from '../components/OtpModal';

const interestRates = [
  { term: 1, rate: 3.2 },
  { term: 3, rate: 4.0 },
  { term: 6, rate: 5.2 },
  { term: 12, rate: 6.0 },
];

const initialSavings = [
  {
    id: 1,
    amount: 5000000,
    term: 3,
    rate: 4.0,
    start: '2025-07-01',
    status: 'Đang gửi',
  },
];

const SavingsPage = () => {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState(3);
  const [savings, setSavings] = useState(initialSavings);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  let idToSettle = 0;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    const amt = parseInt(amount);
    if (!amt || amt < 1000000) {
      setError('Số tiền gửi tối thiểu 1.000.000 VND');
      return;
    }
    const rate = interestRates.find(i => i.term === term)?.rate || 0;
    setSavings([
      ...savings,
      {
        id: Date.now(),
        amount: amt,
        term,
        rate,
        start: new Date().toISOString().slice(0,10),
        status: 'Đang gửi',
      },
    ]);
    setSuccess('Tạo sổ tiết kiệm thành công!');
    setAmount('');
    setTerm(3);
  };

  const handleSettle = (id: number) => {
    idToSettle = id;
    setShowOtp(true);
  };

  const handleOtpVerify = (otp: string) => {
    setShowOtp(false);
    setOtpSuccess(true);
    setSavings(savings.map(s => s.id === idToSettle ? { ...s, status: 'Đã tất toán' } : s));
  };

  return (
    <div className="savings-container">
      <h2>Gửi tiền tiết kiệm online</h2>
      <form className="savings-form" onSubmit={handleCreate}>
        <input
          type="number"
          min="1000000"
          placeholder="Số tiền gửi (VND)"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <select value={term} onChange={e => setTerm(Number(e.target.value))}>
          {interestRates.map(i => (
            <option key={i.term} value={i.term}>{i.term} tháng - {i.rate}%/năm</option>
          ))}
        </select>
        <button type="submit" className="savings-btn">Tạo sổ tiết kiệm</button>
      </form>
      {success && <div className="savings-success">{success}</div>}
      {error && <div className="savings-error">{error}</div>}
      <h3 style={{marginTop:32}}>Danh sách sổ tiết kiệm</h3>
      <div className="savings-list">
        {savings.map(s => (
          <div key={s.id} className="savings-item">
            <div><b>Số tiền:</b> {s.amount.toLocaleString()} VND</div>
            <div><b>Kỳ hạn:</b> {s.term} tháng</div>
            <div><b>Lãi suất:</b> {s.rate}%/năm</div>
            <div><b>Ngày gửi:</b> {s.start}</div>
            <div><b>Trạng thái:</b> {s.status}</div>
            {s.status === 'Đang gửi' && (
              <button className="savings-btn" onClick={()=>handleSettle(s.id)}>Tất toán</button>
            )}
          </div>
        ))}
        {savings.length === 0 && <div>Chưa có sổ tiết kiệm nào.</div>}
      </div>
      <OtpModal open={showOtp} onClose={()=>setShowOtp(false)} onVerify={handleOtpVerify} />
      {otpSuccess && <div className="savings-success">Tất toán thành công!</div>}
    </div>
  );
};

export default SavingsPage;
