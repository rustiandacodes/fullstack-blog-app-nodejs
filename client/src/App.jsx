import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import WriteArticle from './pages/WriteArticle';
import Dashboard from './pages/Dashboard';
import ArticlePage from './pages/ArticlePage';
import UserProfile from './pages/UserProfile';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/write" element={<WriteArticle />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/update-article/:id" element={<WriteArticle />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
