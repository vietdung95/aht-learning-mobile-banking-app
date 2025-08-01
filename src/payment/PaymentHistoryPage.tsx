import React, { useState } from 'react';
import './PaymentHistory.css';

const mockHistory = [
  { id: 1, type: 'NFC', merchant: 'Cửa hàng tiện lợi A', amount: 120000, date: '2025-08-01 09:12' },
  { id: 2, type: 'QR', merchant: 'Cafe C', amount: 45000, date: '2025-07-31 15:40' },
  { id: 3, type: 'NFC', merchant: 'Siêu thị B', amount: 350000, date: '2025-07-30 18:22' },
  { id: 4, type: 'QR', merchant: 'Siêu thị B', amount: 200000, date: '2025-07-29 10:05' },
];

const PaymentHistoryPage = () => {
  const [history] = useState(mockHistory);

  return (
    <div className="history-container">
      <h2>Lịch sử thanh toán</h2>
      <div className="history-list">
        {history.map(item => (
          <div key={item.id} className="history-item">
            <div>
              <b>{item.merchant}</b> <span className={`history-type ${item.type}`}>{item.type}</span>
            </div>
            <div>
              <span className="history-amount">-{item.amount.toLocaleString()} VND</span>
              <span className="history-date">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistoryPage;
