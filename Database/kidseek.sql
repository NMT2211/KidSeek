create database KidSeek
use KidSeek
CREATE TABLE NguoiDung (
    MaNguoiDung INT PRIMARY KEY IDENTITY,
    TenDangNhap NVARCHAR(100) NOT NULL,
    MatKhau NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255),
    VaiTro NVARCHAR(50)
);

-- Tạo bảng Môn học
CREATE TABLE MonHoc (
    MaMonHoc INT PRIMARY KEY IDENTITY,
    TenMonHoc NVARCHAR(255),
    MoTa TEXT,
    HinhAnh NVARCHAR(255),
    NgayTao DATETIME DEFAULT GETDATE()
);

-- Tạo bảng Bài giảng
CREATE TABLE BaiGiang (
    MaBaiGiang INT PRIMARY KEY IDENTITY,
    MaMonHoc INT FOREIGN KEY REFERENCES MonHoc(MaMonHoc),
    TieuDe NVARCHAR(255),
    NoiDung TEXT,
    VideoURL NVARCHAR(255),
    MaBaiTracNghiem INT NULL
);

-- Tạo bảng Tin nhắn (trò chuyện với AI)
CREATE TABLE TinNhan (
    MaTinNhan INT PRIMARY KEY IDENTITY,
    MaNguoiDung INT FOREIGN KEY REFERENCES NguoiDung(MaNguoiDung),
    VaiTro NVARCHAR(50), -- user / assistant
    NoiDung TEXT,
    ThoiGianGui DATETIME DEFAULT GETDATE()
);

-- Tạo bảng Bài tập
CREATE TABLE BaiTap (
    MaBaiTap INT PRIMARY KEY IDENTITY,
    MaMonHoc INT FOREIGN KEY REFERENCES MonHoc(MaMonHoc),
    MaNguoiDung INT FOREIGN KEY REFERENCES NguoiDung(MaNguoiDung),
    TieuDe NVARCHAR(255),
    MoTa TEXT,
    HanNop DATETIME,
    TrangThai NVARCHAR(50)
);

-- Tạo bảng Bài luyện tập
CREATE TABLE BaiLuyenTap (
    MaBai INT PRIMARY KEY IDENTITY,
    MaMonHoc INT FOREIGN KEY REFERENCES MonHoc(MaMonHoc),
    CauHoi TEXT,
    DapAn NVARCHAR(255),
    GiaiThich TEXT,
    Kieu NVARCHAR(50) -- trac nghiem / đúng sai / điền chỗ trống
);

-- Tạo bảng Gói đăng ký
CREATE TABLE GoiDangKy (
    MaGoi INT PRIMARY KEY IDENTITY,
    MaNguoiDung INT FOREIGN KEY REFERENCES NguoiDung(MaNguoiDung),
    TenGoi NVARCHAR(255),
    GiaTien FLOAT,
    NgayBatDau DATETIME,
    NgayKetThuc DATETIME,
    TrangThai NVARCHAR(50) -- active / expired / canceled
);



INSERT INTO NguoiDung (TenDangNhap, MatKhau, Email, VaiTro) VALUES
(N'phuhuynh1', 'matkhau123', 'ph1@example.com', 'phu_huynh'),
(N'giaovien1', 'matkhau456', 'gv1@example.com', 'giao_vien');

-- Thêm môn học mẫu
INSERT INTO MonHoc (TenMonHoc, MoTa, HinhAnh) VALUES
(N'Toán học', N'Môn học về các con số', 'toan.png'),
(N'Tiếng Việt', N'Học ngôn ngữ mẹ đẻ', 'tiengviet.png');

-- Thêm bài giảng mẫu
INSERT INTO BaiGiang (MaMonHoc, TieuDe, NoiDung, VideoURL) VALUES
(1, N'Phép cộng cơ bản', N'Nội dung bài giảng phép cộng', 'video1.mp4'),
(2, N'Đọc hiểu đoạn văn', N'Nội dung bài đọc hiểu', 'video2.mp4');

-- Thêm bài luyện tập mẫu
INSERT INTO BaiLuyenTap (MaMonHoc, CauHoi, DapAn, GiaiThich, Kieu) VALUES
(1, N'2 + 3 = ?', N'5', N'Cộng hai số nguyên', N'trac nghiem'),
(2, N'Câu nào là đúng?', N'Cây xanh quang hợp', N'Kiến thức lớp 2', N'dung sai');

-- Thêm bài tập mẫu
INSERT INTO BaiTap (MaMonHoc, MaNguoiDung, TieuDe, MoTa, HanNop, TrangThai) VALUES
(1, 1, N'Giải toán cộng', N'Bài tập về phép cộng', '2025-05-15', 'chua nop'),
(2, 1, N'Đọc hiểu bài 2', N'Đọc và trả lời câu hỏi', '2025-05-20', 'da nop');

-- Thêm tin nhắn mẫu
INSERT INTO TinNhan (MaNguoiDung, VaiTro, NoiDung) VALUES
(1, N'user', N'Chào thầy AI, hôm nay học gì?'),
(1, N'assistant', N'Hôm nay chúng ta học về phép cộng nhé!');

-- Thêm gói đăng ký mẫu
INSERT INTO GoiDangKy (MaNguoiDung, TenGoi, GiaTien, NgayBatDau, NgayKetThuc, TrangThai) VALUES
(1, N'Gói miễn phí', 0, '2025-05-01', '2025-06-01', 'active'),
(2, N'Gói nâng cao', 199000, '2025-05-01', '2025-08-01', 'active');

ALTER TABLE MonHoc
ALTER COLUMN MoTa NVARCHAR(MAX);


select * from MonHoc

SELECT name FROM sys.tables;
