// src/pages/Login.jsx
import "../styles/login.css";
import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ usernameOrEmail: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState(""); // thêm dòng này

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("user", JSON.stringify(res.data));
      
      

      navigate("/");
      window.location.reload();
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng thử lại."); // dùng state để hiển thị lỗi
    }
  };


  return (
    <main className="flex-grow bg-white text-gray-800 flex items-center justify-center min-h-screen">
      <div className="auth-container max-w-md w-full p-6 mt-4">
        <div className="auth-header text-center mb-6">
          <h1 className="text-4xl  text-gray-900 text-center">
            Chào mừng trở lại <br />
            <span className="relative inline-block group cursor-pointer">
              <span className="KidSeek">KidSeek</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
            </span>
          </h1>
          <h3 className="text-md text-gray-600 mt-2"> Đăng nhập để tiếp tục hành trình học tập của bạn </h3>
        </div>

        <div className="auth-tabs flex gap-4 justify-center mb-6 border-b pb-2">
          <a className="text-blue-600 font-semibold border-b-2 border-blue-600" href="/login"> Đăng nhập </a>
          <a className="text-gray-500 hover:text-blue-600" href="/register"> Đăng ký mới </a>
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded-md px-4 py-3 mb-4 text-sm">
            {error}
          </div>
        )}

        <form className="auth-form space-y-4" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email or Username</label>
            <input name="usernameOrEmail"  value={form.usernameOrEmail} onChange={handleChange} required className="form-control w-full border p-2 rounded-md" />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="block text-sm font-medium mb-1">Mật khẩu</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required className="form-control w-full border p-2 rounded-md" />
          </div>

          <div className="auth-info flex justify-between items-center text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="accent-blue-600" />
              Ghi nhớ đăng nhập
            </label>
            <span className="text-gray-400 cursor-not-allowed">Quên mật khẩu?</span>
          </div>

          <button
            type="submit"
            className="btn btn-animated w-full py-2 rounded-md font-semibold"
          >
            <span>Đăng nhập</span>
          </button>

        </form>

        <div className="auth-toggle text-center text-sm mt-4">
          Chưa có tài khoản?
          <a href="/register" className="text-blue-600 font-medium"> Đăng ký ngay </a>
        </div>

        <div className="auth-features mt-6 space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span>Trả lời mọi câu hỏi từ lớp 1 đến lớp 12, kể cả các môn học</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span>Giao diện thân thiện, dễ sử dụng</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span>Hỗ trợ từ file, giải thích nội dung</span>
          </div>
        </div>

        <div className="floating auth-illustration mt-8 flex justify-center">
          <svg
            width="200"
            height="100"
            viewBox="0 0 200 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 10C88.9543 10 80 18.9543 80 30C80 41.0457 88.9543 50 100 50C111.046 50 120 41.0457 120 30C120 18.9543 111.046 10 100 10Z"
              fill="#4F6DF5"
              fillOpacity="0.1"
            />
            <path
              d="M100 20C94.4772 20 90 24.4772 90 30C90 35.5228 94.4772 40 100 40C105.523 40 110 35.5228 110 30C110 24.4772 105.523 20 100 20Z"
              fill="#4F6DF5"
            />
            <path
              d="M60 70C60 58.9543 68.9543 50 80 50H120C131.046 50 140 58.9543 140 70V90H60V70Z"
              fill="#4F6DF5"
              fillOpacity="0.1"
            />
            <path
              d="M20 80L40 40L60 80H20Z"
              fill="#FF6B8B"
              fillOpacity="0.2"
            />
            <path
              d="M140 80L160 40L180 80H140Z"
              fill="#FF6B8B"
              fillOpacity="0.2"
            />
          </svg>
        </div>

      </div>
    </main>
  );
}
