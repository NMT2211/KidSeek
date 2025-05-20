import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes'; // đường dẫn đến file router bạn tạo

import './index.css'; // nếu bạn có CSS chung

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({ once: true });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
