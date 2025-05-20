import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Subjects from './pages/Subjects';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import SubjectDetail from './pages/SubjectDetail';
import ChatPage from './pages/ChatPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Các trang có Navbar */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Subjects" element={<Subjects />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/About" element={<About />} />
          <Route path="/SubjectDetail" element={<SubjectDetail />} />
          <Route path="/ChatPage" element={<ChatPage />} />

        </Route>

        {/* Các trang không có Navbar */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
