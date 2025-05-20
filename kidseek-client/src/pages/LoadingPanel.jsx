import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";


const thinkingQuotes = [
  "🤔 Hmm... tránh trùng đề, đang chọn câu hay nhất...",
  "🧠 Đang tính logic để phù hợp độ tuổi và môn học...",
  "📚 Chờ xíu nhé, mình đang chọn đề siêu chất!",
  "🌀 Đang loại bỏ những câu hỏi nhàm chán...",
  "✨ Sắp xong rồi, chuẩn bị tinh thần nhé!",
];

const gradingQuotes = [
  "🔍 Đang soi kỹ từng đáp án của bạn...",
  "📊 Hệ thống đang tính điểm và phân tích kết quả...",
  "🧠 AI đang đánh giá từng câu hỏi một cách thông minh...",
  "🤔 Xem bạn có đạt 10/10 không nào...",
];

export default function LoadingView({
  avatarUrl = "/avatars/robot-study.gif",
  submitting = false,
  aiDone = false,
  onFinish = () => {},
  duration = 20 // Thời gian mini game
}) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [position, setPosition] = useState({ top: "30%", left: "40%" });
  const [quote, setQuote] = useState("");
  const [showScoreText, setShowScoreText] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [highestScore, setHighestScore] = useState(Number(localStorage.getItem("miniGameHighScore") || 0));
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [clickTimestamps, setClickTimestamps] = useState([]);
  const [comboCount, setComboCount] = useState(0);

  // TIẾN TRÌNH LOADING (Tách biệt mini game)
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (progress >= 100) return;

    const interval = setInterval(() => {
      setProgress((p) => {
        if (aiDone) return Math.min(p + 5, 100); // khi AI xong, tăng nhanh
        return Math.min(p + 1, 100); // bình thường ~90s
      });
    }, aiDone ? 100 : 600); // 90s = 900ms * 100%

    return () => clearInterval(interval);
  }, [progress, aiDone]);

  // Quote động
  useEffect(() => {
    const timer = setInterval(() => {
      const list = submitting ? gradingQuotes : thinkingQuotes;
      setQuote(list[Math.floor(Math.random() * list.length)]);
    }, 4000);
    return () => clearInterval(timer);
  }, [submitting]);

  // Game timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setGameEnded(true);
      if (score > highestScore) {
        localStorage.setItem("miniGameHighScore", score);
        setHighestScore(score);
      }
      onFinish(score);
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Avatar di chuyển
  useEffect(() => {
    const moveTimer = setInterval(() => {
      const top = Math.floor(Math.random() * 70) + 10;
      const left = Math.floor(Math.random() * 70) + 10;
      setPosition({ top: `${top}%`, left: `${left}%` });
    }, 1000 * speedMultiplier);
    return () => clearInterval(moveTimer);
  }, [speedMultiplier]);

  const handleClick = () => {
    const now = Date.now();
    const recent = clickTimestamps.filter(ts => now - ts < 1500);
    const updated = [...recent, now];
    setClickTimestamps(updated);

    let comboBonus = 1;
    if (updated.length >= 3) {
      comboBonus = 2;
      setComboCount((c) => c + 1);
      confetti({ particleCount: 40, spread: 40, origin: { y: 0.7 } });
    } else {
      setComboCount(0);
    }

    setScore((prev) => prev + comboBonus);
    setShowScoreText(true);
    setTimeout(() => setShowScoreText(false), 400);
  };
  const handleReplay = () => {
    setScore(0);
    setTimeLeft(duration);
    setGameEnded(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 rounded-xl bg-gradient-to-br from-white to-sky-50 border shadow-lg relative overflow-hidden">
      <motion.img
        src={avatarUrl}
        alt="AI Avatar"
        className="w-24 h-24 mx-auto mb-4 drop-shadow-md"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />

      

      <motion.div
        className="text-lg font-semibold text-purple-700 text-center bg-white px-6 py-3 rounded-lg shadow border border-purple-200"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {submitting ? "🤖 Đang chấm bài... Vui lòng đợi nhé!" : "🛠️ AI đang tạo câu hỏi siêu chất cho bạn..."}
      </motion.div>

      <p className="mt-2 text-sm italic text-center text-gray-500">{quote}</p>

      {/* Thanh tiến trình tách biệt */}
      <div className="w-full bg-gray-200 h-3 rounded-full mt-6 overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <p className="text-sm text-center text-blue-600 mt-1">📊 Tiến trình: {progress}%</p>

      {/* Mini Game */}
      <div className="relative mt-6 h-[200px] border rounded-xl bg-white overflow-hidden shadow-inner">
        {comboCount >= 3 && (
          <motion.div
            key={comboCount}
            className="absolute left-1/2 top-5 -translate-x-1/2 bg-yellow-200 px-3 py-1 rounded-lg font-bold text-orange-700 shadow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            🔥 Combo {comboCount}!
          </motion.div>
        )}

        <div className="absolute top-2 left-3 text-sm font-semibold text-gray-700">
          ⏱️ Còn lại: <span className="text-blue-600">{timeLeft}s</span>
        </div>
        <div className="absolute top-2 right-3 text-sm font-semibold text-purple-700">
          🎯 Điểm: <span className="text-pink-600">{score}</span>
        </div>
        <div className="absolute bottom-2 right-3 text-sm text-yellow-600">
          🏆 Kỷ lục: {highestScore}
        </div>

        {!gameEnded && (
          <motion.img
            src={avatarUrl}
            alt="AI"
            onClick={handleClick}
            className="w-16 h-16 absolute cursor-pointer drop-shadow-xl"
            animate={{ top: position.top, left: position.left, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {showScoreText && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -20 }}
            className="absolute left-[50%] top-[50%] text-lg font-bold text-green-600"
          >
            +1
          </motion.div>
        )}

        {gameEnded && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center rounded-xl">
            <h3 className="text-lg font-bold text-green-700 mb-2">
              🎉 Bạn đã bắt được AI <span className="text-pink-600">{score}</span> lần!
            </h3>
            <p className="text-sm text-gray-700">🏆 Kỷ lục: {highestScore}</p>
            {score === highestScore && score > 0 && (
              <p className="text-sm text-red-500 font-semibold animate-pulse">🔥 Kỷ lục mới!</p>
            )}
            <p className="text-xs mt-2 text-gray-600">AI vẫn đang xử lý... Chơi lại nếu thích nhé!</p>
            <button
              onClick={handleReplay}
              className="mt-3 px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow transition"
            >
              🔁 Chơi lại mini game
            </button>
          </div>
        )}

        <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
          🎮 Bấm vào AI càng nhiều càng tốt!
        </p>
      </div>
    </div>
  );
}
