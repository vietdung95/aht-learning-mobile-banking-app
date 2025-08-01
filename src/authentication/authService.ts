// Mock service cho authentication
export const mockLogin = async (username: string, password: string) => {
  // Giả lập đăng nhập thành công nếu username và password không rỗng
  if (username && password) {
    return { success: true, token: 'mock-token', user: { username } };
  }
  return { success: false, message: 'Sai thông tin đăng nhập' };
};

export const mockRegister = async (username: string, password: string) => {
  // Giả lập đăng ký thành công nếu username và password không rỗng
  if (username && password) {
    return { success: true };
  }
  return { success: false, message: 'Vui lòng nhập đủ thông tin' };
};

export const mockForgotPassword = async (username: string) => {
  // Giả lập gửi OTP thành công
  if (username) {
    return { success: true, otp: '123456' };
  }
  return { success: false, message: 'Không tìm thấy tài khoản' };
};
