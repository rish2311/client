import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostForm from './components/PostForm';
import Profile from './components/Profile';
import EditPostForm from './components/EditForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditPostForm />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        
          <Route path="/create-blog" element={<PostForm />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
