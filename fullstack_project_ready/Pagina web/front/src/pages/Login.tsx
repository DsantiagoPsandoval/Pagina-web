import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [user,setUser] = useState('')
  const [pass,setPass] = useState('')
  const [error,setError] = useState('')
  const nav = useNavigate()

  async function doLogin(e:any){
    e.preventDefault()
    setError('')
    try {
      const res = await axios.post('http://localhost:4000/auth/login', { username: user, password: pass })
      localStorage.setItem('token', res.data.token)
      nav('/home')
    } catch (err:any) {
      setError(err.response?.data?.error || 'Error desconocido')
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4">
          <h3>Iniciar sesión</h3>
          <form onSubmit={doLogin}>
            <div className="mb-2"><label>Usuario</label><input className="form-control" value={user} onChange={e=>setUser(e.target.value)} /></div>
            <div className="mb-2"><label>Contraseña</label><input type="password" className="form-control" value={pass} onChange={e=>setPass(e.target.value)} /></div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-primary">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  )
}
