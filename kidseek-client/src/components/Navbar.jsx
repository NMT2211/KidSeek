import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-item nav-item-active" : "nav-item"}>
          <i className="bi bi-house-door me-1 text-lg"></i>Trang chủ
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-item nav-item-active" : "nav-item"}>
          <i className="bi bi-info-circle me-1 text-lg"></i>Giới thiệu
        </NavLink>
      </li>
      {user && (
        <>
          <li><NavLink to="/Subjects" className={({ isActive }) => isActive ? "nav-item nav-item-active" : "nav-item"}><i className="bi bi-book me-1 text-lg"></i>Môn học</NavLink></li>
          <li><NavLink to="/ChatPage" className={({ isActive }) => isActive ? "nav-item nav-item-active" : "nav-item"}><i className="bi bi-chat-dots me-1 text-lg"></i>Trò chuyện với AI</NavLink></li>
          <li><NavLink to="/bai-tap" className={({ isActive }) => isActive ? "nav-item nav-item-active" : "nav-item"}><i className="bi bi-journal-text me-1 text-lg"></i>Bài tập</NavLink></li>
          <li><NavLink to="/luyen-tap" className={({ isActive }) => isActive ? "nav-item nav-item-active" : "nav-item"}><i className="bi bi-graph-down me-1 text-lg"></i>Luyện tập</NavLink></li>
          <li><NavLink to="/nang-cap" className={({ isActive }) => isActive ? "nav-item nav-item-active" : "nav-item"}><i className="bi bi-star me-1 text-lg"></i>Nâng cấp</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow z-50">
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-20 py-4">
        
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2 shrink-0">
          <img src="/logo.svg" alt="Logo" className="w-10 h-10 rounded-full" />
          <span className="text-2xl font-bold text-blue-600 ">KidSeek</span>
        </NavLink>

        {/* Hamburger icon (mobile only) */}
        <button
          className="block lg:hidden text-gray-700 text-2xl ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className="bi bi-list"></i>
        </button>

        {/* Desktop menu */}
        <ul className="hidden lg:flex items-center space-x-4 flex-1 justify-center min-w-0 flex-wrap">
          {menuItems}
        </ul>

        {/* User info (desktop only) */}
        <div className="hidden lg:block shrink-0">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="user-button">
                <i className="bi bi-person-circle text-lg"></i>
                <span className="capitalize">{user.fullname}</span>
                <i className="bi bi-caret-down text-xs"></i>
              </button>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={() => { navigate("/profile"); setDropdownOpen(false); }} className="dropdown-item">
                    <i className="bi bi-person"></i> Hồ sơ của tôi
                  </button>
                  <hr className="border-gray-200 my-1" />
                  <button onClick={() => { localStorage.removeItem("user"); navigate("/login"); }} className="dropdown-item">
                    <i className="bi bi-box-arrow-right"></i> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink to="/login" className="text-base font-medium text-gray-700 hover:text-blue-600">
                <i className="bi bi-box-arrow-in-right text-lg"></i> Đăng nhập
              </NavLink>
              <NavLink to="/register" className="group relative flex items-center gap-2 bg-blue-500 text-white text-base font-medium px-4 py-2 rounded-full overflow-hidden transition">
                <i className="bi bi-person-plus text-lg z-10"></i>
                <span className="z-10">Đăng ký</span>
                <span className="absolute inset-0 bg-blue-400 opacity-30 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white px-4 pb-4">
          <ul className="flex flex-col space-y-2">{menuItems}</ul>
          {user ? (
            <div className="mt-4">
              <button onClick={() => { navigate("/profile"); setIsMobileMenuOpen(false); }} className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
                <i className="bi bi-person"></i> Hồ sơ của tôi
              </button>
              <button onClick={() => { localStorage.removeItem("user"); navigate("/login"); }} className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
                <i className="bi bi-box-arrow-right"></i> Đăng xuất
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-4">
              <NavLink to="/login" className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">Đăng nhập</NavLink>
              <NavLink to="/register" className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded bg-blue-50 text-blue-600">Đăng ký</NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
