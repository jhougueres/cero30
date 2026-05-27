'use client'
import { useState } from 'react'
import { supabase } from '../supabase'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCargando(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    })
    if (error) {
      setError('Email o contraseña incorrectos')
      setCargando(false)
    } else {
      window.location.href = '/admin'
    }
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #080807; color: white; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .card { background: #111110; border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 2.5rem; width: 100%; max-width: 400px; }
        .logo { font-family: serif; font-size: 1.8rem; font-weight: 900; margin-bottom: 0.5rem; }
        .logo span { color: #00E676; }
        .subtitulo { font-size: 0.85rem; color: rgba(255,255,255,0.4); margin-bottom: 2rem; font-weight: 300; }
        .campo { margin-bottom: 1.2rem; }
        .campo label { display: block; font-size: 0.78rem; color: rgba(255,255,255,0.5); margin-bottom: 0.4rem; }
        .campo input { width: 100%; background: #080807; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 0.75rem 1rem; font-size: 0.9rem; color: white; font-family: inherit; outline: none; transition: border-color 0.2s; }
        .campo input:focus { border-color: rgba(0,230,118,0.4); }
        .btn { width: 100%; background: #00E676; color: #080807; border: none; padding: 0.9rem; border-radius: 50px; font-size: 1rem; font-weight: 700; cursor: pointer; margin-top: 0.5rem; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .error { background: rgba(255,61,61,0.1); border: 1px solid rgba(255,61,61,0.3); border-radius: 8px; padding: 0.8rem 1rem; font-size: 0.85rem; color: #FF3D3D; margin-top: 1rem; text-align: center; }
      `}</style>

      <div className="card">
        <div className="logo">CERO<span>30</span></div>
        <p className="subtitulo">Panel de administración</p>
        <form onSubmit={handleSubmit}>
          <div className="campo">
            <label>Email</label>
            <input
              type="email" required
              placeholder="admin@cero30.es"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
            />
          </div>
          <div className="campo">
            <label>Contraseña</label>
            <input
              type="password" required
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
            />
          </div>
          <button className="btn" type="submit" disabled={cargando}>
            {cargando ? 'Entrando...' : 'Entrar →'}
          </button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </>
  )
}