import { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '', email: '', password: '', confirmPassword: '', role: 'Học sinh', age: '', grade: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Mật khẩu không khớp');
      return;
    }
    try {
      await registerUser(form);
      navigate('/');
    } catch {
      alert('Tạo tài khoản thất bại!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-800">
      <Navbar />
      <div className="w-full max-w-md mx-auto py-10 px-5">
        <h2 className="text-2xl font-semibold text-center">Chào mừng đến với <span className="text-purple-600 font-bold">KidSeek</span></h2>
        <p className="text-center text-sm text-gray-600 mt-2">Tạo tài khoản mới để bắt đầu hành trình học tập</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input className="w-full p-2 border rounded" name="username" placeholder="Họ và tên" value={form.username} onChange={handleChange} required />
          <input className="w-full p-2 border rounded" name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
          <input className="w-full p-2 border rounded" name="password" placeholder="Mật khẩu" type="password" value={form.password} onChange={handleChange} required />
          <input className="w-full p-2 border rounded" name="confirmPassword" placeholder="Xác nhận mật khẩu" type="password" value={form.confirmPassword} onChange={handleChange} required />
          <select className="w-full p-2 border rounded" name="role" value={form.role} onChange={handleChange}>
            <option value="Học sinh">Học sinh</option>
            <option value="Phụ huynh">Phụ huynh</option>
          </select>
          <div className="flex space-x-2">
            <input className="w-1/2 p-2 border rounded" name="age" placeholder="Tuổi" value={form.age} onChange={handleChange} />
            <input className="w-1/2 p-2 border rounded" name="grade" placeholder="Lớp" value={form.grade} onChange={handleChange} />
          </div>
          <button className="w-full py-2 bg-blue-600 text-white rounded">Tạo tài khoản</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
