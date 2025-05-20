import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Hoc_sinh",
    age: "",
    grade: "1"
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const age = parseInt(form.age);
    const gradeInt = parseInt(form.grade);

    if (!form.username.trim()) {
      setError("Vui lòng nhập tên đăng nhập.");
      return;
    }
    if (!form.fullname.trim()) {
      setError("Vui lòng nhập họ và tên.");
      return;
    }
    if (!form.email.trim()) {
      setError("Vui lòng nhập email.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu không khớp.");
      return;
    }
    if (isNaN(age) || age < 1 || age > 100) {
      setError("Tuổi phải nằm trong khoảng từ 1 đến 100.");
      return;
    }
    if (isNaN(gradeInt) || gradeInt < 1 || gradeInt > 12) {
      setError("Lớp học phải nằm trong khoảng từ 1 đến 12.");
      return;
    }


    const payload = {
      username: form.username,
      fullname: form.fullname,
      email: form.email,
      password: form.password,
      role: form.role,
      age: age,
      grade: gradeInt
    };

    
    try {
      await registerUser(payload);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Tạo tài khoản thất bại!");
      }
    }


  };

  return (
    <main className="flex-grow bg-white text-gray-800 flex items-center justify-center min-h-screen">
      <div className="auth-container max-w-md w-full p-6">
        <div className="auth-header text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Chào mừng đến với <br />
            <span className="relative inline-block group cursor-pointer">
              <span className="KidSeek">KidSeek</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
            </span>
          </h1>
          <h4 className="text-md text-gray-600 mt-2">Tạo tài khoản mới để bắt đầu hành trình học tập</h4>
        </div>

        <div className="auth-tabs flex gap-4 justify-center mb-6 border-b pb-2">
          <a className="text-gray-500 hover:text-blue-600" href="/login">Đăng nhập</a>
          <a className="text-blue-600 font-semibold border-b-2 border-blue-600" href="/register">Đăng ký mới</a>
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded-md px-4 py-3 mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form space-y-4">
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Họ và tên</label>
            <input name="fullname" value={form.fullname} onChange={handleChange} required className="w-full border p-2 rounded-md" />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Tên đăng nhập</label>
            <input name="username" value={form.username} onChange={handleChange} required className="w-full border p-2 rounded-md" />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border p-2 rounded-md" />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full border p-2 rounded-md" />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Xác nhận mật khẩu</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword || ""} onChange={handleChange} required className="w-full border p-2 rounded-md" />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Vai trò</label>
            <select name="role" value={form.role} onChange={handleChange} className="w-full border p-2 rounded-md">
              <option value="Hoc_sinh">Học sinh</option>
              <option value="Phu_huynh">Phụ huynh</option>
            </select>
          </div>

          <div className="flex space-x-2">
            <input className="w-1/2 p-2 border rounded" name="age" type="number" placeholder="Tuổi (1–100)" value={form.age} onChange={handleChange} />
            <select name="grade" value={form.grade} onChange={handleChange} className="w-1/2 p-2 border rounded-md">
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>Lớp {i + 1}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-animated w-full py-2 rounded-md font-semibold"
          >
            <span>Tạo tài khoản</span>
          </button>
        </form>

        <div className="auth-toggle text-center text-sm mt-4">
          Bạn đã có tài khoản?
          <a href="/login" className="text-blue-600 font-medium"> Đăng nhập</a>
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
      </div>
    </main>
  );
}
