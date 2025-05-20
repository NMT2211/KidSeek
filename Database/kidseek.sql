-- Tạo database KidSeek
-- ===================== TẠO LẠI DATABASE =====================

CREATE DATABASE KidSeek;
GO
USE KidSeek;
GO

-- ===================== NGƯỜI DÙNG =====================
CREATE TABLE Users (
    UserId INT PRIMARY KEY IDENTITY,
    Username VARCHAR(100) NOT NULL,
    Password NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255),
    Role NVARCHAR(50),
    Fullname NVARCHAR(100),
    Age INT,
    Grade INT
);

-- ===================== MÔN HỌC =====================
CREATE TABLE Subjects (
    SubjectId INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(255),
    Description NVARCHAR(MAX),
    Image NVARCHAR(255),
    Grade INT,
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- ===================== BÀI GIẢNG =====================
CREATE TABLE Lectures (
    LectureId INT PRIMARY KEY IDENTITY,
    SubjectId INT FOREIGN KEY REFERENCES Subjects(SubjectId),
    Title NVARCHAR(255),
    Content TEXT,
    VideoURL NVARCHAR(255),
    QuizId INT NULL
);

-- ===================== HỘI THOẠI AI =====================
CREATE TABLE Messages (
    MessageId INT PRIMARY KEY IDENTITY,
    UserId INT FOREIGN KEY REFERENCES Users(UserId),
    Role NVARCHAR(50),
    Content TEXT,
    SentAt DATETIME DEFAULT GETDATE()
);

-- ===================== BÀI TẬP =====================
CREATE TABLE Assignments (
    AssignmentId INT PRIMARY KEY IDENTITY,
    SubjectId INT FOREIGN KEY REFERENCES Subjects(SubjectId),
    UserId INT FOREIGN KEY REFERENCES Users(UserId),
    Title NVARCHAR(255),
    Description TEXT,
    DueDate DATETIME,
    Status NVARCHAR(50)
);

-- ===================== NGÂN HÀNG CÂU HỎI =====================
CREATE TABLE Practices (
    PracticeId INT PRIMARY KEY IDENTITY,
    SubjectId INT FOREIGN KEY REFERENCES Subjects(SubjectId),
    Question TEXT,
    Answer NVARCHAR(255),
    Explanation TEXT,
    Type NVARCHAR(50)
);

-- ===================== GÓI HỌC =====================
CREATE TABLE Subscriptions (
    SubscriptionId INT PRIMARY KEY IDENTITY,
    UserId INT FOREIGN KEY REFERENCES Users(UserId),
    PackageName NVARCHAR(255),
    Price FLOAT,
    StartDate DATETIME,
    EndDate DATETIME,
    Status NVARCHAR(50)
);



-- ===================== KẾT QUẢ CHAT AI =====================




CREATE TABLE ChatResults (
    ChatResultId INT PRIMARY KEY IDENTITY,
    UserId INT NOT NULL,                      -- Mã người dùng
    SubjectId INT NOT NULL,                   -- Môn học
    Prompt NVARCHAR(MAX),                     -- Nội dung prompt ban đầu
    AiResponse NVARCHAR(MAX),                 -- JSON gốc sinh câu hỏi từ AI
    AiFeedback NVARCHAR(MAX),                 -- ✅ JSON phản hồi khi chấm bài
	Questions NVARCHAR(MAX),
    Score FLOAT NULL,                         -- ✅ Điểm tổng (0–10)
    Comment NVARCHAR(MAX),                    -- ✅ Nhận xét tổng thể từ AI
    IsGraded BIT DEFAULT 0,                   -- ✅ Đã chấm điểm chưa
    CreatedAt DATETIME DEFAULT GETDATE()      -- Ngày tạo bản ghi
);




select * from Users

select * from Subjects
select * from ChatResults


INSERT INTO Users (Username, Password, Email, Role, Fullname, Age, Grade) VALUES
(N'hocsinh1', '123456', 'hs1@kidseek.vn', 'Hoc_sinh', N'Nguyễn Văn A', 10, 4),  -- Học sinh lớp 4
(N'hocsinh2', '123456', 'hs2@kidseek.vn', 'Hoc_sinh', N'Lê Thị B', 11, 5),
(N'phuhuynh1', 'matkhau1', 'ph1@kidseek.vn', 'Phu_huynh', N'Trần Văn C', 38, 0), -- Phụ huynh
(N'giaovien1', 'giaovien1', 'gv1@kidseek.vn', 'Giao_vien', N'Đỗ Thị D', 30, 0),   -- Giáo viên
(N'admin', 'admin123', 'admin@kidseek.vn', 'Admin', N'Quản trị viên', 35, 0);     -- Quản trị
INSERT INTO Subjects (Name, Description, Image) VALUES
(N'Toán học', N'Học các phép tính, đại số, hình học', 'math.png'),
(N'Tiếng Việt', N'Học đọc, viết, ngữ pháp tiếng Việt', 'tiengviet.png'),
(N'Tiếng Anh', N'Học từ vựng, ngữ pháp, giao tiếp', 'english.png'),
(N'Khoa học', N'Tìm hiểu thế giới tự nhiên, sinh vật, vật lý', 'science.png'),
(N'Lịch sử', N'Học các sự kiện lịch sử Việt Nam và thế giới', 'history.png');
INSERT INTO Lectures (SubjectId, Title, Content, VideoURL, QuizId) VALUES
(1, N'Phép cộng cơ bản', N'Nội dung phép cộng cho học sinh lớp 1', 'video_add.mp4', NULL),
(2, N'Tập đọc bài thơ', N'Đọc hiểu bài thơ thiếu nhi', 'video_read.mp4', NULL),
(3, N'Giới thiệu bản thân bằng tiếng Anh', N'Ngữ pháp và từ vựng cơ bản', 'video_intro.mp4', NULL),
(4, N'Cơ thể người', N'Tìm hiểu về các bộ phận cơ thể', 'video_body.mp4', NULL),
(5, N'Chiến thắng Bạch Đằng', N'Lịch sử và ý nghĩa trận đánh', 'video_bachdang.mp4', NULL);
INSERT INTO Assignments (SubjectId, UserId, Title, Description, DueDate, Status) VALUES
(1, 1, N'Bài tập cộng trừ', N'Làm 10 bài tập về phép cộng trừ', '2025-05-20', 'not_submitted'),
(2, 1, N'Tập đọc 2 đoạn văn', N'Ghi âm và nộp lại', '2025-05-21', 'submitted'),
(3, 2, N'Giới thiệu bản thân', N'Viết đoạn văn ngắn bằng tiếng Anh', '2025-05-23', 'not_submitted'),
(4, 1, N'Mô tả hệ tiêu hoá', N'Tổng hợp từ sách giáo khoa', '2025-05-24', 'submitted'),
(5, 2, N'Tóm tắt cuộc khởi nghĩa Lam Sơn', N'10 dòng', '2025-05-25', 'not_submitted');
INSERT INTO Practices (SubjectId, Question, Answer, Explanation, Type) VALUES
(1, N'5 + 3 = ?', N'8', N'Cộng 5 với 3 ra 8', 'multiple_choice'),
(2, N'Câu nào viết đúng chính tả?', N'Em yêu trường em', N'Không sai chính tả', 'true_false'),
(3, N'What is the plural of “child”?', N'Children', N'Bất quy tắc', 'multiple_choice'),
(4, N'Thực vật quang hợp vào thời điểm nào?', N'Ban ngày', N'Có ánh sáng mặt trời', 'multiple_choice'),
(5, N'Chiến thắng Điện Biên diễn ra năm nào?', N'1954', N'Là mốc quan trọng của lịch sử VN', 'multiple_choice');
INSERT INTO Messages (UserId, Role, Content) VALUES
(1, N'user', N'Thầy ơi hôm nay học gì vậy?'),
(1, N'assistant', N'Hôm nay chúng ta học Toán nhé!'),
(2, N'user', N'Giúp em làm bài tiếng Anh với!'),
(2, N'assistant', N'Dĩ nhiên rồi, bắt đầu nhé.'),
(1, N'user', N'Thầy ơi, em nộp bài tập chưa?');
INSERT INTO Subscriptions (UserId, PackageName, Price, StartDate, EndDate, Status) VALUES
(1, N'Gói miễn phí', 0, '2025-05-01', '2025-06-01', 'active'),
(2, N'Gói nâng cao', 199000, '2025-05-10', '2025-08-10', 'active'),
(3, N'Gói thử nghiệm', 0, '2025-05-15', '2025-05-30', 'active'),
(4, N'Premium+', 299000, '2025-05-01', '2025-09-01', 'expired'),
(5, N'Gói thường', 99000, '2025-04-01', '2025-05-01', 'canceled');

UPDATE Subjects SET Grade = 1 WHERE Name = N'Toán học';
UPDATE Subjects SET Grade = 1 WHERE Name = N'Tiếng Việt';
UPDATE Subjects SET Grade = 2 WHERE Name = N'Tiếng Anh';
UPDATE Subjects SET Grade = 3 WHERE Name = N'Khoa học';
UPDATE Subjects SET Grade = 4 WHERE Name = N'Lịch sử';


DELETE TOP (134)
  FROM ChatAnswers
