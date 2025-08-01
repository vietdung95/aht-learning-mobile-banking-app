import React, { useState } from 'react';
import './Support.css';

const mockFaq = [
  { q: 'Làm sao để đổi mật khẩu?', a: 'Bạn vào mục Thông tin tài khoản > Cập nhật thông tin để đổi mật khẩu.' },
  { q: 'Tôi bị lỗi khi chuyển tiền?', a: 'Vui lòng kiểm tra lại số dư và thông tin tài khoản nhận. Nếu vẫn lỗi, liên hệ tổng đài.' },
  { q: 'Làm sao để mở sổ tiết kiệm?', a: 'Vào mục Gửi tiết kiệm, nhập số tiền và kỳ hạn để mở sổ.' },
];

const SupportPage = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([
    { from: 'bot', text: 'Xin chào! Tôi có thể giúp gì cho bạn?' }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setChat([...chat, { from: 'user', text: input }]);
    // Giả lập trả lời tự động
    const found = mockFaq.find(f => input.toLowerCase().includes(f.q.toLowerCase().slice(0,8)));
    setTimeout(() => {
      setChat(c => [...c, { from: 'bot', text: found ? found.a : 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.' }]);
    }, 800);
    setInput('');
  };

  return (
    <div className="support-container">
      <h2>Hỗ trợ khách hàng</h2>
      <div className="support-chat">
        {chat.map((m, i) => (
          <div key={i} className={`support-msg ${m.from}`}>{m.text}</div>
        ))}
      </div>
      <form className="support-form" onSubmit={handleSend}>
        <input
          placeholder="Nhập câu hỏi..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit">Gửi</button>
      </form>
      <div className="support-faq">
        <b>FAQ:</b>
        {mockFaq.map((f, i) => (
          <div key={i} className="support-faq-item">
            <span>Q: {f.q}</span>
            <span>A: {f.a}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportPage;
