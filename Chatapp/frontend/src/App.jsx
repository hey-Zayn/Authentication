import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Signup from './pages/Signup'
import Setting from './pages/Setting'
import Profile from './pages/Profile'
import { Toaster } from "react-hot-toast";
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react'


const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>
  )

  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/signin" />} />
        <Route path="/signin" element={!authUser ? <SignIn /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/signin" />} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App