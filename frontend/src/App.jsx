import {Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to={"/login"}/>} ></Route>
      <Route path='/login' element={<LoginPage/>} ></Route>
      <Route path='/register' element={<RegisterPage/>} ></Route>
      <Route path='/dashboard' element={<Dashboard/>} ></Route>
    </Routes>
  )
}

export default App;
