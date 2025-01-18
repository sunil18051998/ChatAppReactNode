import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import SignupPage from './pages/SignupPage';
import Loginpage from './pages/Loginpage';
import SettingsPage from './pages/SettingsPage';
import Profilepage from './pages/Profilepage';
import { useAuthstore } from './store/useAuthstore';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore';
import { Navigate } from 'react-router-dom';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthstore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if( isCheckingAuth && !authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }
  return (
    <div data-theme={theme} >
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login" /> } />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Loginpage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <Profilepage /> : <Navigate to="/login" />} />

      </Routes>

      <Toaster />
    </div>
  )
}

export default App