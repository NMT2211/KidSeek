import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaRobot, FaMagic } from "react-icons/fa";
import confetti from "canvas-confetti";

import LoadingPanel from "./LoadingPanel";


export default function SubjectDetail() {
  const { subjectId } = useParams();
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  
  const [loading, setLoading] = useState(false); // ✅ CHỈ fetch mới bật loading

  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [gradingResult, setGradingResult] = useState(null);
  const [chatResultId, setChatResultId] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState("🤖");
  const [showWarning, setShowWarning] = useState(false);



  const avatars = ["🤖", "👩‍🏫", "🧠", "📚"];

  const getResultBg = (score) => {
    if (score >= 9) return "bg-green-100 text-green-800";
    if (score >= 7) return "bg-blue-100 text-blue-800";
    if (score >= 5) return "bg-yellow-100 text-yellow-900";
    return "bg-red-100 text-red-800";
  };

  const getAvatarUrl = () => {
    switch (selectedAvatar) {
      case "🤖": return "/avatars/robot.gif";
      case "👩‍🏫": return "/avatars/teacher.gif";
      case "🧠": return "/avatars/brain.gif";
      case "📚": return "/avatars/books.gif";
      default: return "/avatars/robot.gif";
    }
  };

  // hiển thị 1 câu đố vui
  const funFacts = [
    "💡 Bạn biết không? Não người có thể xử lý hình ảnh trong 13 mili giây!",
    "🧠 Có hơn 100 tỉ nơron trong bộ não bạn đấy!",
    "📚 Trung bình một người đọc 250 từ/phút. Bạn thì sao?",
    "🎮 Học cũng giống như chơi game – mỗi câu hỏi là 1 màn chơi!",
  ];

  const avatarPromptNote = {
    "🤖": "nhập vai một robot AI thông minh và vui nhộn.",
    "👩‍🏫": "nhập vai một giáo viên tận tâm, giảng giải dễ hiểu.",
    "🧠": "nhập vai một bộ não siêu logic, tạo đề thử thách trí tuệ.",
    "📚": "nhập vai một thủ thư giàu kiến thức, giàu kinh nghiệm."
  };





  

  const fetchQuestions = async (user, subject) => {
    setLoading(true); 
    try {
      const prevResponse = await axios.get(`http://localhost:5069/api/Chat/previous-questions`, {
        params: { userId: user.userId, subjectId: subject.subjectId }
      });

      const previousQuestions = prevResponse.data?.questions || [];
      const avoidList = previousQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n");

      

      
     
      const topicNote = topic
        ? `ưu tiên các dạng đề liên quan đến "${topic}", tránh lặp lại các dạng đã ra trong 10 câu hỏi trước.`
        : "tạo đề với nhiều dạng phong phú, tránh trùng với các dạng đã xuất hiện trong các lần trước.";

      

      // const prompt = `
      //   Danh sách các câu hỏi đã dùng trước đó:\n${avoidList}

      //   ❗ Hãy tạo 10 câu hỏi trắc nghiệm luyện tập mới **không trùng lặp** cho môn ${subject.name}, lớp ${subject.grade}. ${topicNote} dành cho học sinh tên ${user.fullname}, ${user.age} tuổi.

      //   Bạn sẽ ${avatarPromptNote[selectedAvatar]}

      //   → Đảm bảo đáp án đúng được phân bố đều: mỗi đáp án A, B, C, D xuất hiện khoảng 2 đến 3 lần.

      //   ❗ Chỉ trả về JSON thuần không markdown. Mỗi câu gồm: question, options {A,B,C,D}, answer.
      // `;


      const prompt = `
        ❗ Hãy tạo 10 câu hỏi trắc nghiệm luyện tập mới **không trùng lặp**, phù hợp với **học sinh Việt Nam**, **dựa theo chương trình giáo dục tiểu học tại Việt Nam**, cho môn ${subject.name}, lớp ${subject.grade}. ${topicNote} Dành cho học sinh tên ${user.fullname}, ${user.age} tuổi.

        Bạn sẽ ${avatarPromptNote[selectedAvatar]}

        → Đảm bảo đáp án đúng được phân bố đều: A, B, C, D mỗi đáp án 2–3 lần. Không để các câu gần nhau trùng đáp án.

        ❗ Trả về **JSON thuần** dạng:
        {
          "questions":
          [
            {
              "question": "...",
              "options": {
                  "A": "...,
                  "B": "...",
                  "C": "...",
                  "D": "..."
                },
              "answer": "A"
            },
            ...
          ]
        }
        ❗ Chỉ trả về JSON thuần không markdown.
        `;

      



      const messages = [{ role: "user", content: prompt }];

      console.log("🧠 Gửi messages cho DeepSeek:", JSON.stringify(prompt, null, 2));
      const aiRes = await axios.post(
        "https://api.deepseek.com/v1/chat/completions",
        {
          model: "deepseek-chat",
          messages,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_DEEPSEEK_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const usage = aiRes.data.usage;
      const costPrompt = (usage.prompt_tokens / 1000) * 0.0005;
      const costCompletion = (usage.completion_tokens / 1000) * 0.0015;
      const totalCost = costPrompt + costCompletion;

      console.log("📊 Token sử dụng:", usage);
      console.log(`💸 Ước tính chi phí: $${totalCost.toFixed(5)} ~ khoảng ${Math.ceil(totalCost * 24000)} VNĐ`);

      let raw = aiRes.data.choices[0].message.content.trim();
      if (raw.startsWith("```json")) raw = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(raw);

      if (!parsed.questions || !Array.isArray(parsed.questions)) {
        setError("Dữ liệu AI không hợp lệ.");
        return;
      }

      setQuestions(parsed.questions);
      console.log("🤖 Câu hỏi AI tạo ra:", raw);

      const saveRes = await axios.post("http://localhost:5069/api/Chat/save-result", {
        userId: user.userId,
        subjectId: subject.subjectId,
        prompt,
        aiResponse: raw,
        score: null,
        comment: null,
        isGraded: false,
        aiFeedback: null
      });

      setChatResultId(saveRes.data.chatResultId);

    } catch (err) {
      console.error("Lỗi tạo câu hỏi:", err);
      setError("Không thể tạo câu hỏi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };



  const handleAnswer = (index, option) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [index]: option }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;

      return;
    }

    if (!chatResultId) {
      alert("Không thể nộp bài vì chưa có mã phiên làm bài.");
      return;
    }

    setSubmitting(true);
    setProgress(0);

    const payload = {
      chatResultId,
      answers: questions.map((q, i) => ({
        Question: q.question,
        StudentAnswer: answers[i],
      }))
    };

    try {
      const res = await axios.post("http://localhost:5069/api/Chat/submit-answers", payload);

      if (res.data.status === "ok") {
        let percent = 0;
        const interval = setInterval(() => {
          percent += 5;
          if (percent >= 100) {
            clearInterval(interval);
            setGradingResult(res.data);
            setSubmitted(true);
            setSubmitting(false);

            if (res.data.score >= 9) {
              for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                  confetti({
                    particleCount: 150,
                    spread: 80 + i * 5,
                    origin: { y: Math.random() * 0.6 },
                    colors: ["#FFD700", "#FF69B4", "#7FFF00", "#00BFFF", "#FF4500"]
                  });
                }, i * 400);
              }

              if (res.data.score === 10) {
                setTimeout(() => {
                  confetti({
                    particleCount: 500,
                    spread: 360,
                    origin: { y: 0.5 },
                    scalar: 1.2,
                    startVelocity: 45,
                    ticks: 200,
                    colors: ["#FFD700", "#FF1493", "#00FF7F", "#1E90FF", "#FFA500"],
                  });
                }, 2500);
              }
            }

          }
          setProgress(percent);
        }, 50);
      } else {
        alert("Phản hồi từ AI không hợp lệ.");
        setSubmitting(false);
      }
    } catch (err) {
      console.error("Lỗi khi nộp bài:", err);
      alert("Không thể nộp bài. Vui lòng thử lại.");
      setSubmitting(false);
    }
  };

  const renderScoreEffect = (score) => {
    if (score >= 9) return "🏆 Tuyệt đỉnh! Bạn là ngôi sao học tập!";
    if (score >= 7) return "🎉 Rất tốt! Bạn đang làm rất ổn!";
    if (score >= 5) return "💡 Khá ổn! Cùng luyện thêm nữa nhé!";
    return "📘 Đừng bỏ cuộc! Học sinh chăm sẽ giỏi lên từng ngày!";
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-tr from-yellow-50 via-white to-sky-100 rounded-3xl shadow-2xl min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-purple-700 animate-pulse">
        🌈 Luyện Tập Cùng AI {selectedAvatar}
      </h1>
      {!questions.length && !loading && !submitted && (
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="text-center">
            <label className="block font-medium mb-1">Bạn muốn luyện dạng đề gì?</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="px-4 py-2 border rounded w-full max-w-md"
              placeholder="Ví dụ: phép cộng, hình học, so sánh số, dãy số..."
            />
          </div>

          <div className="flex gap-4 items-center justify-center">
            <p className="text-lg font-semibold">Chọn Avatar AI:</p>
            {avatars.map((avt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAvatar(avt)}
                className={`text-4xl hover:scale-125 transition ${
                  selectedAvatar === avt ? "ring-2 ring-yellow-500 rounded-full bg-white shadow" : ""
                }`}
              >
                {avt}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              const subject = JSON.parse(localStorage.getItem("selectedSubject"));
              const user = JSON.parse(localStorage.getItem("user"));
              if (subject && user) {
                fetchQuestions(user, subject);
              } else {
                setError("Không tìm thấy thông tin học sinh hoặc môn học.");
                setLoading(false);
              }
            }}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-purple-700 transition"
          >
            🚀 Bắt đầu luyện tập
                </button>
                
                <button
                  onClick={() => {
                    setTopic("");
                    const subject = JSON.parse(localStorage.getItem("selectedSubject"));
                    const user = JSON.parse(localStorage.getItem("user"));
                    if (subject && user) {
                      fetchQuestions(user, subject);
                    } else {
                      setError("Không tìm thấy thông tin học sinh hoặc môn học.");
                      setLoading(false);
                    }
                  }}
                  className="bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-500 transition"
                >
                  ❎ Bỏ qua chọn dạng đề
                </button>

        </div>
      )}

     

      {error && <p className="text-red-600 font-semibold text-center">{error}</p>}

      {/* ✔ Mini game và loading trong lúc tạo câu hỏi/chấm bài */}
      {(loading || submitting) && (
        <LoadingPanel
          avatarUrl={getAvatarUrl()}
          submitting={submitting}
          aiDone={false}
          onFinish={(miniScore) => {
            console.log("Mini game kết thúc, điểm:", miniScore);
          }}
        />
      )}

      {!loading && !error && questions.length > 0 && (
        <>
         
          {questions.map((q, idx) => {
            const selected = answers[idx];
            const correct = gradingResult?.details?.[idx]?.correctAnswer;
            const isCorrect = gradingResult?.details?.[idx]?.isCorrect;
            const explanation = gradingResult?.details?.[idx]?.explanation;

            return (
              <motion.div
                key={idx}
                className="mb-6 p-4 border rounded shadow-sm bg-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <p className="font-semibold mb-2 text-lg text-purple-800">
                  {idx + 1}. {q.question}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(q.options).map(([key, val]) => {
                    const isSelected = selected === key;
                    const isThisCorrect = gradingResult && key === correct;
                    const isThisWrong = gradingResult && isSelected && key !== correct;

                    const baseClass = "border px-3 py-2 rounded-lg cursor-pointer transition";
                    const selectedClass = isSelected ? "font-semibold" : "";

                    const resultStyle = gradingResult
                      ? isThisCorrect
                        ? "bg-green-100 border-green-500 text-green-700"
                        : isThisWrong
                        ? "bg-red-100 border-red-500 text-red-700"
                        : "hover:bg-gray-100"
                      : isSelected
                      ? "bg-blue-100 border-blue-500 text-blue-600"
                      : "hover:bg-blue-50";

                    return (
                      <div
                        key={key}
                        className={`${baseClass} ${resultStyle} ${selectedClass}`}
                        onClick={() => handleAnswer(idx, key)}
                      >
                        <span className="font-bold">{key}.</span> {val}
                        {gradingResult && isSelected && (
                          <span className="ml-2 italic text-sm">
                            {isCorrect ? "✔ Đúng" : "✘ Sai"}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {gradingResult && explanation && (
                  <p className="mt-2 text-sm italic text-gray-600">
                    🧠 <strong>Nhận xét:</strong> {explanation}
                  </p>
                )}
              </motion.div>
            );
          })}

          
          {(loading || submitting) && (

            <LoadingPanel
              avatarUrl={getAvatarUrl()}
              submitting={submitting}
              aiDone={!loading && !submitting}
              onFinish={(miniScore) => {
                console.log("Mini game kết thúc, điểm:", miniScore);
              }}
            />
          )}

          


          {!submitted && (
            <div className="mt-8 text-center">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-gradient-to-r  from-green-500 to-green-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:scale-105 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed "
              >
                {submitting ? (
                  <>
                    <FaMagic className="animate-spin" />
                    Đang chấm bài...
                  </>
                ) : (
                  <>
                    <FaRobot />
                    ✅ Nộp bài và xem kết quả
                  </>
                )}
              </button>
            </div>
          )}


          {submitted && gradingResult && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className={`mt-8 p-6 border rounded shadow-lg flex items-center gap-5 ${getResultBg(gradingResult.score)}`}
            >
              <img
                src={getAvatarUrl()}
                alt="Avatar AI"
                className="w-24 h-24 rounded-full border-4 border-white shadow-md"
              />
              <div>
                <h3 className={`text-2xl font-bold mb-2 ${gradingResult.score === 10 ? "text-yellow-500 animate-bounce" : ""}`}>
                  🎯 Bạn đạt {gradingResult.score}/10 điểm – {renderScoreEffect(gradingResult.score)}
                </h3>

                {gradingResult.score === 10 && (
                  <p className="text-lg font-semibold text-pink-600 mt-2 animate-pulse">
                    🌟 Kỷ lục tuyệt đối! Bạn là nhà vô địch AI hôm nay! 🌟
                  </p>
                )}

                {gradingResult.comment && (
                  <p className="mt-2 text-sm italic">
                    🧑‍🏫 <strong>Nhận xét tổng thể:</strong> {gradingResult.comment}
                  </p>
                )}
                <p className="text-sm mt-2">
                  🎉 Cảm ơn bạn đã hoàn thành bài luyện tập! Hãy luyện tiếp để lên cấp nha!
                </p>
              </div>
            </motion.div>
          )}
          {submitted && gradingResult && (
            <div className="mt-10 flex justify-center flex-wrap gap-4">
              <button
                onClick={() => {
                  setQuestions([]);
                  setAnswers({});
                  setGradingResult(null);
                  setChatResultId(null);
                  setSubmitted(false);
                  setProgress(0);
                  setError(null);

                  const subject = JSON.parse(localStorage.getItem("selectedSubject"));
                  const user = JSON.parse(localStorage.getItem("user"));
                  if (subject && user) {
                    fetchQuestions(user, subject);
                  }
                }}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-indigo-700 transition"
              >
                🔁 Tạo bài mới
              </button>

              <button
                onClick={() => {
                  setQuestions([]);
                  setAnswers({});
                  setGradingResult(null);
                  setChatResultId(null);
                  setSubmitted(false);
                  setProgress(0);
                  setError(null);
                }}
                className="flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-600 transition"
              >
                ↩️ Quay lại
              </button>
            </div>
          )}


        </>
      )}

      {showWarning && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="fixed bottom-6 right-6 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg shadow-lg z-50"
        >
          ⚠️ Vui lòng trả lời hết tất cả câu hỏi trước khi nộp bài!
        </motion.div>
      )}

    </div>
  );
}  