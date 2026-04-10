import {Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to={"/login"}/>} ></Route>
      <Route path='/login' element={<LoginPage/>} ></Route>
      <Route path='/register' element={<RegisterPage/>} ></Route>
      <Route path="/dashboard" element={
      <ProtectedRoute>
          <Dashboard />
      </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App;
