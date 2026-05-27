'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

function useAuth() {
  const [usuario, setUsuario] = useState(null)
  const [verificando, setVerificando] = useState(true)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) window.location.href = '/login'
      else setUsuario(data.session.user)
      setVerificando(false)
    })
  }, [])
  return { usuario, verificando }
}

export default function Admin() {
  const { verificando } = useAuth()
  const [restaurantes, setRestaurantes] = useState([])
  const [cargando, setCargando] = useState(true)

  const cargarRestaurantes = async () => {
    const { data, error } = await supabase
      .from('restaurantes')
      .select('*')
    if (!error) setRestaurantes(data)
    setCargando(false)
  }

  useEffect(() => {
    if (!verificando) cargarRestaurantes()
  }, [verificando])

  if (verificando) return <div style={{color:'white', padding:'2rem'}}>Verificando...</div>

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #080807; color: white; min-height: 100vh; padding: 2rem; }
        .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .logo { font-family: serif; font-size: 1.5rem; font-weight: 900; }
        .logo span { color: #00E676; }
        .titulo { font-size: 0.85rem; color: rgba(255,255,255,0.4); }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
        .stat { background: #111110; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 1.2rem; }
        .stat-num { font-size: 2rem; font-weight: 700; color: #00E676; line-height: 1; }
        .stat-label { font-size: 0.78rem; color: rgba(255,255,255,0.4); margin-top: 0.3rem; }
        .tabla-wrap { background: #111110; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; overflow: hidden; }
        .tabla-header { padding: 1rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 0.85rem; font-weight: 600; }
        table { width: 100%; border-collapse: collapse; }
        th { padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; color: rgba(255,255,255,0.4); border-bottom: 1px solid rgba(255,255,255,0.07); font-weight: 500; text-transform: uppercase; letter-spacing: 1px; }
        td { padding: 0.9rem 1rem; font-size: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.04); }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: rgba(255,255,255,0.02); }
        .badge { display: inline-block; padding: 0.2rem 0.7rem; border-radius: 50px; font-size: 0.72rem; font-weight: 600; }
        .badge-basico { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6); }
        .badge-pro { background: rgba(0,230,118,0.15); color: #00E676; }
        .badge-premium { background: rgba(255,200,50,0.15); color: #EF9F27; }
        .cargando { text-align: center; padding: 3rem; color: rgba(255,255,255,0.4); font-size: 0.9rem; }
        .vacio { text-align: center; padding: 3rem; color: rgba(255,255,255,0.3); font-size: 0.9rem; }
        .btn-refresh { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.6); padding: 0.45rem 1rem; border-radius: 50px; font-size: 0.8rem; cursor: pointer; }
        .btn-refresh:hover { border-color: rgba(255,255,255,0.3); color: white; }
      `}</style>

      <div className="header">
        <div>
          <div className="logo">CERO<span>30</span></div>
          <div className="titulo">Panel de administración</div>
        </div>
        <button className="btn-refresh" onClick={cargarRestaurantes}>
          ↻ Actualizar
        </button>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-num">{restaurantes.length}</div>
          <div className="stat-label">Restaurantes registrados</div>
        </div>
        <div className="stat">
          <div className="stat-num">
            {restaurantes.filter(r => r.plan === 'pro').length}
          </div>
          <div className="stat-label">Plan Pro</div>
        </div>
        <div className="stat">
          <div className="stat-num">
            {restaurantes.filter(r => r.plan === 'premium').length}
          </div>
          <div className="stat-label">Plan Premium</div>
        </div>
        <div className="stat">
          <div className="stat-num" style={{color: '#EF9F27'}}>
            €{restaurantes.reduce((acc, r) => {
              if (r.plan === 'pro') return acc + 99
              if (r.plan === 'premium') return acc + 149
              return acc + 49
            }, 0)}
          </div>
          <div className="stat-label">MRR estimado</div>
        </div>
      </div>

      <div className="tabla-wrap">
        <div className="tabla-header">Restaurantes registrados</div>
        {cargando ? (
          <div className="cargando">Cargando...</div>
        ) : restaurantes.length === 0 ? (
          <div className="vacio">No hay restaurantes registrados todavía</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Restaurante</th>
                <th>Propietario</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Plan</th>
                <th>Ciudad</th>
              </tr>
            </thead>
            <tbody>
              {restaurantes.map((r, i) => (
                <tr key={i}>
                  <td style={{fontWeight: 500}}>{r.nombre}</td>
                  <td>{r.propietario}</td>
                  <td style={{color: 'rgba(255,255,255,0.6)'}}>{r.email}</td>
                  <td style={{color: 'rgba(255,255,255,0.6)'}}>{r.telefono}</td>
                  <td>
                    <span className={`badge badge-${r.plan}`}>
                      {r.plan}
                    </span>
                  </td>
                  <td>{r.ciudad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}