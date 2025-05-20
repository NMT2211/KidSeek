// src/pages/Subjects.jsx
import { useEffect, useState } from 'react';
import { getAllSubjects, getSubjectsByGrade } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const navigate = useNavigate();

  const fetchSubjects = async (grade) => {
    try {
      const res = grade ? await getSubjectsByGrade(grade) : await getAllSubjects();
      setSubjects(res.data);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách môn học:', err);
      setSubjects([]); // fallback rỗng
    }
  };

    
    
  useEffect(() => {
    fetchSubjects(selectedGrade);
  }, [selectedGrade]);

  return (
    <main className="flex-grow py-10 px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Danh sách môn học</h2>
        <select
          className="border rounded px-3 py-2 text-sm"
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
        >
          <option value="">Tất cả lớp</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>Lớp {i + 1}</option>
          ))}
        </select>
      </div>

      {subjects.length === 0 ? (
        <div className="text-center text-gray-500 italic mt-10">
          Không có môn học nào cho {selectedGrade ? `lớp ${selectedGrade}` : 'danh sách hiện tại'}.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.subjectId}
              className="bg-white rounded-xl shadow-sm p-5 flex flex-col justify-between hover:shadow-md transform hover:-translate-y-1 transition duration-200"
            >
              <div className="text-center group">
                <div className="relative inline-block text-purple-600 text-5xl mb-3">
                  <i className="bi bi-journal-text"></i>
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-0 h-[2px] bg-purple-500 transition-all group-hover:w-full"></span>
                </div>
                <h4 className="text-lg font-semibold mb-1">{subject.name}</h4>
                <p className="text-sm text-gray-500">{subject.description}</p>
              </div>
              <button
                onClick={() => {
                    localStorage.setItem('selectedSubject', JSON.stringify(subject));
                    const user = JSON.parse(localStorage.getItem('user'));
                    if (user) {
                        navigate(`/SubjectDetail`);
                    } else {
                        alert("Vui lòng đăng nhập để xem chi tiết");
                    }
                    }}

                className="mt-4 py-2 w-full border text-blue-600 border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
              >
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
