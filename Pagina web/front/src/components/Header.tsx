import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header(){
  const nav = useNavigate()
  const logout = () => { localStorage.removeItem('token'); nav('/login') }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand header-brand" to="/home">Ing. Sistemas</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item"><Link className="nav-link" to="/home">Inicio</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/projects">Gestión</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/about">Acerca</Link></li>
        </ul>
        <div className="d-flex">
          <button className="btn btn-outline-light me-2" onClick={()=>nav('/projects')}>Ir a Gestión</button>
          <button className="btn btn-outline-light" onClick={logout}>Salir</button>
        </div>
      </div>
    </nav>
  )
}
