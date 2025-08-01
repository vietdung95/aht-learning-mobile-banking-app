import React, { useState } from 'react';
import './Transfer.css';

const mockAccounts = [
  { id: 1, name: 'Nguyen Van B', account: '1234567890', phone: '0901111222', bank: 'AppBank' },
  { id: 2, name: 'Tran Thi C', account: '9876543210', phone: '0903333444', bank: 'AppBank' },
  { id: 3, name: 'Pham Van D', account: '1111222233', phone: '0905555666', bank: 'OtherBank' },
];

const TransferPage = () => {
  const [type, setType] = useState('internal');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    if (!to || !amount || parseInt(amount) <= 0) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    // Giả lập kiểm tra tài khoản
    const found = type === 'internal'
      ? mockAccounts.find(a => a.account === to || a.phone === to)
      : to.length === 10;
    if (!found) {
      setError('Không tìm thấy tài khoản nhận');
      return;
    }
    setSuccess('Chuyển tiền thành công!');
    setTo('');
    setAmount('');
  };

  return (
    <div className="transfer-container">
      <h2>Chuyển tiền</h2>
      <div className="transfer-tabs">
        <button className={type==='internal'?'active':''} onClick={()=>setType('internal')}>Nội bộ</button>
        <button className={type==='external'?'active':''} onClick={()=>setType('external')}>Liên ngân hàng</button>
      </div>
      <form className="transfer-form" onSubmit={handleTransfer}>
        <input
          placeholder={type==='internal' ? 'Số tài khoản/SĐT nhận' : 'Số tài khoản ngân hàng khác'}
          value={to}
          onChange={e => setTo(e.target.value)}
        />
        <input
          type="number"
          min="1000"
          placeholder="Số tiền (VND)"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button type="submit" className="transfer-btn">Chuyển tiền</button>
      </form>
      {success && <div className="transfer-success">{success}</div>}
      {error && <div className="transfer-error">{error}</div>}
      <div className="transfer-demo">
        <b>Demo tài khoản/SĐT nhận:</b>
        {mockAccounts.map(a => (
          <div key={a.id} className="transfer-demo-item">
            <span>{a.name}:</span> <span>{a.account} / {a.phone} ({a.bank})</span>
          </div>
        ))}
      </div>
      <div className="transfer-qr">
        <h3>Nhận tiền qua QR code</h3>
        <div className="transfer-qr-box">QR1234567890</div>
        <div style={{fontSize:13, color:'#757575'}}>Mã QR này dùng để nhận tiền vào tài khoản của bạn</div>
      </div>
    </div>
  );
};

export default TransferPage;
