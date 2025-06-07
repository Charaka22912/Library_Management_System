import { Routes, Route } from 'react-router-dom';
import Login from './pages/loginPage';
import Register from './pages/registerPage'
function App() {
  return (
    <Routes>
      <Route path="" element={<Login />} />
      <Route path='/register' element={<Register/>}/>
    </Routes>
  );
}

export default App;