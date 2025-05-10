create database KidSeek
use KidSeek


CREATE DATABASE KidSeek;
GO
USE KidSeek;
GO

-- Users table
CREATE TABLE Users (
    UserId INT PRIMARY KEY IDENTITY,
    Username NVARCHAR(100) NOT NULL,
    Password NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255),
    Role NVARCHAR(50)
);
ALTER TABLE Users
ADD Age INT NULL,
    Grade INT NULL;


-- Subjects table
CREATE TABLE Subjects (
    SubjectId INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(255),
    Description NVARCHAR(MAX),
    Image NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Lectures table
CREATE TABLE Lectures (
    LectureId INT PRIMARY KEY IDENTITY,
    SubjectId INT FOREIGN KEY REFERENCES Subjects(SubjectId),
    Title NVARCHAR(255),
    Content TEXT,
    VideoURL NVARCHAR(255),
    QuizId INT NULL
);

-- Messages table (Chat with AI)
CREATE TABLE Messages (
    MessageId INT PRIMARY KEY IDENTITY,
    UserId INT FOREIGN KEY REFERENCES Users(UserId),
    Role NVARCHAR(50), -- user / assistant
    Content TEXT,
    SentAt DATETIME DEFAULT GETDATE()
);

-- Assignments table
CREATE TABLE Assignments (
    AssignmentId INT PRIMARY KEY IDENTITY,
    SubjectId INT FOREIGN KEY REFERENCES Subjects(SubjectId),
    UserId INT FOREIGN KEY REFERENCES Users(UserId),
    Title NVARCHAR(255),
    Description TEXT,
    DueDate DATETIME,
    Status NVARCHAR(50) -- submitted / not_submitted
);

-- Practice questions table
CREATE TABLE Practices (
    PracticeId INT PRIMARY KEY IDENTITY,
    SubjectId INT FOREIGN KEY REFERENCES Subjects(SubjectId),
    Question TEXT,
    Answer NVARCHAR(255),
    Explanation TEXT,
    Type NVARCHAR(50) -- multiple_choice / true_false / fill_in_the_blank
);

-- Subscription packages table
CREATE TABLE Subscriptions (
    SubscriptionId INT PRIMARY KEY IDENTITY,
    UserId INT FOREIGN KEY REFERENCES Users(UserId),
    PackageName NVARCHAR(255),
    Price FLOAT,
    StartDate DATETIME,
    EndDate DATETIME,
    Status NVARCHAR(50) -- active / expired / canceled
);


INSERT INTO Users (Username, Password, Email, Role) VALUES
(N'parent1', 'password123', 'parent1@example.com', 'parent'),
(N'teacher1', 'password456', 'teacher1@example.com', 'teacher');

INSERT INTO Subjects (Name, Description, Image) VALUES
(N'Mathematics', N'The subject of numbers and calculations', 'math.png'),
(N'Vietnamese', N'Native language learning', 'vietnamese.png');

INSERT INTO Lectures (SubjectId, Title, Content, VideoURL) VALUES
(1, N'Basic Addition', N'Lecture content about addition', 'video1.mp4'),
(2, N'Reading Comprehension', N'Lecture content about reading', 'video2.mp4');

INSERT INTO Practices (SubjectId, Question, Answer, Explanation, Type) VALUES
(1, N'2 + 3 = ?', N'5', N'Add two integers', N'multiple_choice'),
(2, N'Which sentence is correct?', N'Trees perform photosynthesis', N'Grade 2 knowledge', N'true_false');

INSERT INTO Assignments (SubjectId, UserId, Title, Description, DueDate, Status) VALUES
(1, 1, N'Addition Practice', N'Exercises about addition', '2025-05-15', 'not_submitted'),
(2, 1, N'Reading Exercise 2', N'Read and answer questions', '2025-05-20', 'submitted');

INSERT INTO Messages (UserId, Role, Content) VALUES
(1, N'user', N'Hello AI teacher, what are we learning today?'),
(1, N'assistant', N'Today we are learning about addition!');

INSERT INTO Subscriptions (UserId, PackageName, Price, StartDate, EndDate, Status) VALUES
(1, N'Free Package', 0, '2025-05-01', '2025-06-01', 'active'),
(2, N'Premium Package', 199000, '2025-05-01', '2025-08-01', 'active');

INSERT INTO Users (Username, Password, Email, Role) VALUES
(N'phuhuynh1', 'matkhau123', 'ph1@example.com', 'phu_huynh'),
(N'giaovien1', 'matkhau456', 'gv1@example.com', 'giao_vien');

INSERT INTO Subjects (Name, Description, Image) VALUES
(N'Toán học', N'Môn học về các con số', 'toan.png'),
(N'Tiếng Việt', N'Học ngôn ngữ mẹ đẻ', 'tiengviet.png');

INSERT INTO Lectures (SubjectId, Title, Content, VideoURL) VALUES
(1, N'Phép cộng cơ bản', N'Nội dung bài giảng phép cộng', 'video1.mp4'),
(2, N'Đọc hiểu đoạn văn', N'Nội dung bài đọc hiểu', 'video2.mp4');

INSERT INTO Practices (SubjectId, Question, Answer, Explanation, Type) VALUES
(1, N'2 + 3 = ?', N'5', N'Cộng hai số nguyên', N'trac nghiem'),
(2, N'Câu nào là đúng?', N'Cây xanh quang hợp', N'Kiến thức lớp 2', N'dung sai');

INSERT INTO Assignments (SubjectId, UserId, Title, Description, DueDate, Status) VALUES
(1, 1, N'Giải toán cộng', N'Bài tập về phép cộng', '2025-05-15', 'chua nop'),
(2, 1, N'Đọc hiểu bài 2', N'Đọc và trả lời câu hỏi', '2025-05-20', 'da nop');

INSERT INTO Messages (UserId, Role, Content) VALUES
(1, N'user', N'Chào thầy AI, hôm nay học gì?'),
(1, N'assistant', N'Hôm nay chúng ta học về phép cộng nhé!');

INSERT INTO Subscriptions (UserId, PackageName, Price, StartDate, EndDate, Status) VALUES
(1, N'Gói miễn phí', 0, '2025-05-01', '2025-06-01', 'active'),
(2, N'Gói nâng cao', 199000, '2025-05-01', '2025-08-01', 'active');


select * from Users

SELECT name FROM sys.tables;
