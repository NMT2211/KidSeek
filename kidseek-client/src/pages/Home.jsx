// src/pages/Home.js
import React from 'react';

export default function Home() {
  return (
    <div className="p-8">
      {/* Banner */}
      <div className="bg-blue-600 text-white text-center py-16 rounded-lg shadow-lg mb-8">
        <h1 className="text-5xl font-bold mb-4">Chào mừng bạn đến với nền tảng học tập</h1>
        <p className="text-lg">Học mọi lúc, mọi nơi với các khóa học chất lượng cao</p>
      </div>

      {/* Tính năng nổi bật */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Tính năng nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Khóa học đa dạng</h3>
            <p>Đa dạng môn học từ Toán, Lý, Hóa đến Lập trình, Thiết kế.</p>
          </div>
          <div className="p-4 bg-white rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Học trực tuyến</h3>
            <p>Truy cập bài giảng video và tài liệu mọi lúc, mọi nơi.</p>
          </div>
          <div className="p-4 bg-white rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Theo dõi tiến độ</h3>
            <p>Kiểm tra tiến độ học tập và thành tích dễ dàng.</p>
          </div>
        </div>
      </section>

      {/* Các môn học */}
      <section>
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Các môn học</h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <li className="bg-blue-100 text-blue-800 p-4 rounded text-center">Toán</li>
          <li className="bg-blue-100 text-blue-800 p-4 rounded text-center">Lý</li>
          <li className="bg-blue-100 text-blue-800 p-4 rounded text-center">Hóa</li>
          <li className="bg-blue-100 text-blue-800 p-4 rounded text-center">Lập trình</li>
        </ul>
      </section>
    </div>
  );
}
