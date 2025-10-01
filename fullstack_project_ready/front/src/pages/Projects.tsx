import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Project = { id:string, title:string, description?:string, status:string }

// Six functions showcased: loadProjects, addProject, updateProject, deleteProject, handleError, clearForm
export default function Projects(){
  const [projects,setProjects] = useState<Project[]>([])
  const [title,setTitle] = useState('')
  const [desc,setDesc] = useState('')
  const [error,setError] = useState('')
  const token = localStorage.getItem('token') || ''

  useEffect(()=>{ loadProjects() },[])

  async function loadProjects(){
    try{
      const res = await axios.get('http://localhost:4000/api/projects', { headers: { Authorization: `Bearer ${token}` } })
      setProjects(res.data)
    }catch(err:any){ handleError(err) }
  }

  async function addProject(){
    try{
      if(!title) return setError('El título es obligatorio')
      const res = await axios.post('http://localhost:4000/api/projects', { title, description: desc }, { headers: { Authorization: `Bearer ${token}` } })
      setProjects(prev => [...prev, res.data])
      clearForm()
    }catch(err:any){ handleError(err) }
  }

  async function updateProject(id:string){
    try{
      const res = await axios.put(`http://localhost:4000/api/projects/${id}`, { status: 'completado' }, { headers: { Authorization: `Bearer ${token}` } })
      setProjects(prev => prev.map(p => p.id === id ? res.data : p))
    }catch(err:any){ handleError(err) }
  }

  async function deleteProject(id:string){
    try{
      await axios.delete(`http://localhost:4000/api/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      setProjects(prev => prev.filter(p => p.id !== id))
    }catch(err:any){ handleError(err) }
  }

  function handleError(err:any){
    console.error(err)
    setError(err.response?.data?.error || 'Error en la operación')
    setTimeout(()=>setError(''),4000)
  }

  function clearForm(){ setTitle(''); setDesc(''); setError('') }

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card p-3">
          <h5>Nueva tarea/proyecto</h5>
          <input className="form-control mb-2" placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} />
          <textarea className="form-control mb-2" placeholder="Descripción" value={desc} onChange={e=>setDesc(e.target.value)} />
          <button className="btn btn-success w-100" onClick={addProject}>Agregar</button>
          {error && <div className="alert alert-danger mt-2">{error}</div>}
        </div>
      </div>
      <div className="col-md-8">
        <div className="card p-3">
          <h5>Proyectos</h5>
          <ul className="list-group">
            {projects.map(p => (
              <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong className={p.status==='completado' ? 'text-decoration-line-through' : ''}>{p.title}</strong>
                  <div className="small text-muted">{p.description}</div>
                </div>
                <div>
                  <button className="btn btn-sm btn-primary me-2" onClick={()=>updateProject(p.id)}>Marcar completo</button>
                  <button className="btn btn-sm btn-danger" onClick={()=>deleteProject(p.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
