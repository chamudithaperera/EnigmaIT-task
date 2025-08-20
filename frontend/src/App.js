import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((s) => s.auth.user);
  const isHydrating = useSelector((s) => s.auth.isHydrating);

  if (isHydrating) {
    return null;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/favorites" element={user ? <Favorites /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
