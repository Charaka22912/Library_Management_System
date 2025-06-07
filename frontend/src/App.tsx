import { Routes, Route } from 'react-router-dom';
import Login from './pages/loginPage';
import Register from './pages/registerPage'
import Home from './pages/home';
function App() {
  return (
    <Routes>
      <Route path="" element={<Login />} />
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' element={< Home />} />
    </Routes>
  );
}

export default App;