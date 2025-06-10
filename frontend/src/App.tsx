import { Routes, Route } from "react-router-dom";
import Login from "./pages/loginPage";
import Register from "./pages/registerPage";
import Home from "./pages/home";
import Admin from "./pages/admin";
function App() {
  return (
    <Routes>
      <Route path="" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
