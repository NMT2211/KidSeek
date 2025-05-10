import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseList from './pages/CourseList';
import AdminDashboard from './pages/AdminDashboard';
import ChatAI from './pages/ChatAI';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/chat" element={<ChatAI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

