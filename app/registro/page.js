'use client'
import { useState } from 'react'
import { supabase } from '../supabase'

export default function Registro() {
  const [form, setForm] = useState({
    nombre: '', propietario: '', email: '', telefono: '', ciudad: 'Granada', plan: 'basico'
  })
  const [estado, setEstado] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCargando(true)
    setEstado('')
const { data, error } = await supabase.from('restaurantes').insert([form])
console.log('Error:', error)
console.log('Data:', data)
    if (error) {
      setEstado('error')
    } else {
      setEstado('ok')
      setForm({ nombre: '', propietario: '', email: '', telefono: '', ciudad: 'Granada', plan: 'basico' })
    }
    setCargando(false)
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #080807; color: white; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .card { background: #111110; border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 2.5rem; width: 100%; max-width: 480px; }
        .logo { font-family: serif; font-size: 1.8rem; font-weight: 900; margin-bottom: 0.5rem; }
        .logo span { color: #00E676; }
        .subtitulo { font-size: 0.85rem; color: rgba(255,255,255,0.45); margin-bottom: 2rem; font-weight: 300; }
        .campo { margin-bottom: 1.2rem; }
        .campo label { display: block; font-size: 0.8rem; color: rgba(255,255,255,0.5); margin-bottom: 0.4rem; }
        .campo input, .campo select { width: 100%; background: #080807; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 0.75rem 1rem; font-size: 0.9rem; color: white; font-family: inherit; outline: none; transition: border-color 0.2s; }
        .campo input:focus, .campo select:focus { border-color: rgba(0,230,118,0.4); }
        .campo select option { background: #111110; }
        .btn { width: 100%; background: #00E676; color: #080807; border: none; padding: 0.9rem; border-radius: 50px; font-size: 1rem; font-weight: 700; cursor: pointer; margin-top: 0.5rem; transition: opacity 0.2s; }
        .btn:hover { opacity: 0.88; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .mensaje-ok { background: rgba(0,230,118,0.1); border: 1px solid rgba(0,230,118,0.3); border-radius: 8px; padding: 1rem; text-align: center; color: #00E676; font-size: 0.88rem; margin-top: 1rem; }
        .mensaje-error { background: rgba(255,61,61,0.1); border: 1px solid rgba(255,61,61,0.3); border-radius: 8px; padding: 1rem; text-align: center; color: #FF3D3D; font-size: 0.88rem; margin-top: 1rem; }
        .volver { display: block; text-align: center; margin-top: 1.5rem; font-size: 0.82rem; color: rgba(255,255,255,0.35); text-decoration: none; }
        .volver:hover { color: rgba(255,255,255,0.65); }
      `}</style>

      <div className="card">
        <div className="logo">CERO<span>30</span></div>
        <p className="subtitulo">Crea tu cuenta y empieza a vender sin comisiones</p>

        <form onSubmit={handleSubmit}>
          <div className="campo">
            <label>Nombre del restaurante</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Pizzería Sacromonte" required />
          </div>
          <div className="campo">
            <label>Tu nombre</label>
            <input name="propietario" value={form.propietario} onChange={handleChange} placeholder="Ej: Manuel García" required />
          </div>
          <div className="campo">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" required />
          </div>
          <div className="campo">
            <label>Teléfono</label>
            <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Ej: 612 345 678" required />
          </div>
          <div className="campo">
            <label>Plan</label>
            <select name="plan" value={form.plan} onChange={handleChange}>
              <option value="basico">Básico — €49/mes</option>
              <option value="pro">Pro — €99/mes</option>
              <option value="premium">Premium — €149/mes</option>
            </select>
          </div>

          <button className="btn" type="submit" disabled={cargando}>
            {cargando ? 'Registrando...' : 'Crear mi cuenta gratis →'}
          </button>
        </form>

        {estado === 'ok' && (
          <div className="mensaje-ok">
            ✅ ¡Registro completado! Te contactamos en menos de 24 horas.
          </div>
        )}
        {estado === 'error' && (
          <div className="mensaje-error">
            ❌ Algo salió mal. Inténtalo de nuevo o escríbenos a hola@cero30.es
          </div>
        )}

        <a href="/" className="volver">← Volver a la página principal</a>
      </div>
    </>
  )
}