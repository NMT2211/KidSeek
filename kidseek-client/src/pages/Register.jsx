// src/pages/Register.jsx
import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Học sinh",
    age: "",
    grade: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu không khớp");
      return;
    }
    try {
      await registerUser(form);
      navigate("/");
    } catch {
      alert("Tạo tài khoản thất bại!");
    }
  };

  return (
    <main className="flex-grow bg-white text-gray-800 flex items-center justify-center min-h-screen">
      <div className="auth-container max-w-md w-full p-6">
        <div className="auth-header text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Chào mừng đến với <br />
            <span className="relative inline-block group cursor-pointer">
              <span className="text-blue-600">KidSeek</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
            </span>
          </h1>
          <h4 className="text-sm text-gray-600 mt-2">Tạo tài khoản mới để bắt đầu hành trình học tập</h4>
        </div>

        <div className="auth-tabs flex gap-4 justify-center mb-6 border-b pb-2">
          <a className="text-gray-500 hover:text-blue-600" href="/login">Đăng nhập</a>
          <a className="text-blue-600 font-semibold border-b-2 border-blue-600" href="/register">Đăng ký mới</a>
        </div>

        <form onSubmit={handleSubmit} className="auth-form space-y-4">
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Họ và tên</label>
            <input name="username" value={form.username} onChange={handleChange} required className="w-full border p-2 rounded" />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border p-2 rounded" />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full border p-2 rounded" />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Xác nhận mật khẩu</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required className="w-full border p-2 rounded" />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Vai trò</label>
            <select name="role" value={form.role} onChange={handleChange} className="w-full border p-2 rounded">
              <option value="Học sinh">Học sinh</option>
              <option value="Phụ huynh">Phụ huynh</option>
            </select>
          </div>

          <div className="flex space-x-2">
            <input className="w-1/2 p-2 border rounded" name="age" placeholder="Tuổi" value={form.age} onChange={handleChange} />
            <input className="w-1/2 p-2 border rounded" name="grade" placeholder="Lớp" value={form.grade} onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-primary btn-submit w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
            Tạo tài khoản
          </button>
        </form>

        <div className="auth-toggle text-center text-sm mt-4">
          Bạn đã có tài khoản?
          <a href="/login" className="text-blue-600 font-medium"> Đăng nhập</a>
        </div>

        <div class="auth-features mt-6 space-y-2 text-sm">
          <div class="flex items-start gap-2">
            <span class="text-blue-600 font-bold">✓</span>
            <span>Trả lời mọi câu hỏi từ lớp 1 đến lớp 12, kể cả các môn học</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-blue-600 font-bold">✓</span>
            <span>Giao diện thân thiện, dễ sử dụng</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-blue-600 font-bold">✓</span>
            <span>Hỗ trợ từ file, giải thích nội dung</span>
          </div>
        </div>  
      </div>
    </main>
  );
}
