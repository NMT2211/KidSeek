import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';
import HomePage from '../pages/Home';

import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
    
      { path: 'auth', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
]);

export default router;
