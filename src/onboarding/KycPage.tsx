import React, { useState } from 'react';
import './Kyc.css';

const KycPage = () => {
  const [step, setStep] = useState(1);
  const [idImage, setIdImage] = useState<File | null>(null);
  const [faceImage, setFaceImage] = useState<File | null>(null);
  const [info, setInfo] = useState<{ name?: string; id?: string; dob?: string; address?: string }>({});
  const [verified, setVerified] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Giả lập OCR giấy tờ tuỳ thân
  const mockOcr = (file: File) => {
    return new Promise<{ name: string; id: string; dob: string; address: string }>((resolve) => {
      setTimeout(() => resolve({
        name: 'Nguyen Van A',
        id: '0123456789',
        dob: '01/01/1990',
        address: '123 Đường ABC, Quận 1, TP.HCM'
      }), 1200);
    });
  };
  // Giả lập nhận diện khuôn mặt
  const mockFace = (file: File) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  };
  // Giả lập xác thực thông tin cá nhân
  const mockVerify = (info: any) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(!!info.name && !!info.id), 800);
    });
  };

  const handleIdChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdImage(e.target.files[0]);
      setError('');
      setSuccess('');
      setStep(2);
      const ocr = await mockOcr(e.target.files[0]);
      setInfo(ocr);
    }
  };

  const handleFaceChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFaceImage(e.target.files[0]);
      setError('');
      setSuccess('');
      setStep(3);
      const ok = await mockFace(e.target.files[0]);
      if (ok) setStep(4);
      else setError('Nhận diện khuôn mặt thất bại');
    }
  };

  const handleVerify = async () => {
    setError('');
    setSuccess('');
    const ok = await mockVerify(info);
    if (ok) {
      setVerified(true);
      setSuccess('Xác thực KYC thành công!');
    } else {
      setError('Xác thực thất bại, vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <div className="kyc-container">
      <h2>KYC - Xác thực tài khoản</h2>
      {step === 1 && (
        <div className="kyc-step">
          <p>1. Chụp/Upload ảnh CMND/CCCD/Hộ chiếu</p>
          <input type="file" accept="image/*" onChange={handleIdChange} />
        </div>
      )}
      {step === 2 && (
        <div className="kyc-step">
          <p>2. Chụp ảnh khuôn mặt (selfie)</p>
          <input type="file" accept="image/*" onChange={handleFaceChange} />
          <div className="kyc-info">
            <p><b>Họ tên:</b> {info.name}</p>
            <p><b>Số giấy tờ:</b> {info.id}</p>
            <p><b>Ngày sinh:</b> {info.dob}</p>
            <p><b>Địa chỉ:</b> {info.address}</p>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="kyc-step">
          <p>Đang xác thực khuôn mặt...</p>
        </div>
      )}
      {step === 4 && (
        <div className="kyc-step">
          <div className="kyc-info">
            <p><b>Họ tên:</b> {info.name}</p>
            <p><b>Số giấy tờ:</b> {info.id}</p>
            <p><b>Ngày sinh:</b> {info.dob}</p>
            <p><b>Địa chỉ:</b> {info.address}</p>
          </div>
          <button className="kyc-btn" onClick={handleVerify} disabled={verified}>Xác thực thông tin</button>
          {verified && <div className="kyc-success">{success}</div>}
          {error && <div className="kyc-error">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default KycPage;
