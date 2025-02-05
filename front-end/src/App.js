import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Home from "./pages/Home.jsx";
import AdminPage from "./pages/AdminPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />  {/* Ahora el registro es la página principal */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>

  );
}

export default App;
