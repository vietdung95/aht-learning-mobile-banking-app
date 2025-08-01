import React, { useState } from 'react';
import './Notification.css';

const mockNotifications = [
  { id: 1, type: 'giao dịch', content: 'Bạn vừa chuyển 1.000.000 VND đến Nguyen Van B.', time: '2025-08-01 09:12' },
  { id: 2, type: 'khuyến mãi', content: 'Nhận ngay ưu đãi hoàn tiền 5% khi thanh toán NFC!', time: '2025-07-31 10:00' },
  { id: 3, type: 'giao dịch', content: 'Bạn nhận được 500.000 VND từ Tran Thi C.', time: '2025-07-30 15:30' },
];

const NotificationPage = () => {
  const [notifications] = useState(mockNotifications);

  return (
    <div className="noti-container">
      <h2>Thông báo</h2>
      <div className="noti-list">
        {notifications.map(n => (
          <div key={n.id} className={`noti-item noti-${n.type}`}> 
            <div>{n.content}</div>
            <div className="noti-time">{n.time}</div>
          </div>
        ))}
        {notifications.length === 0 && <div>Không có thông báo nào.</div>}
      </div>
    </div>
  );
};

export default NotificationPage;
