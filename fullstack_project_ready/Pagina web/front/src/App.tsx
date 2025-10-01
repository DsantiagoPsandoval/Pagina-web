import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Login from './pages/Login'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App(){
  const isAuth = !!localStorage.getItem('token')
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container my-4 flex-grow-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/login" />} />
          <Route path="/projects" element={isAuth ? <Projects /> : <Navigate to="/login" />} />
          <Route path="/about" element={isAuth ? <About /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isAuth ? '/home' : '/login'} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
