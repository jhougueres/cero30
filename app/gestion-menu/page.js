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

export default function GestionMenu() {
  const { verificando } = useAuth()
  const [platos, setPlatos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({
    nombre: '', descripcion: '', precio: '', categoria: '', disponible: true, restaurante_id: 'demo'
  })

  const cargarPlatos = async () => {
    const { data } = await supabase.from('platos').select('*')
    setPlatos(data || [])
    setCargando(false)
  }

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const guardarPlato = async (e) => {
    e.preventDefault()
    const datos = { ...form, precio: parseFloat(form.precio) }
    if (editando) {
      await supabase.from('platos').update(datos).eq('id', editando)
    } else {
      await supabase.from('platos').insert([datos])
    }
    setForm({ nombre: '', descripcion: '', precio: '', categoria: '', disponible: true, restaurante_id: 'demo' })
    setMostrarForm(false)
    setEditando(null)
    cargarPlatos()
  }

  const eliminarPlato = async (id) => {
    if (confirm('¿Seguro que quieres eliminar este plato?')) {
      await supabase.from('platos').delete().eq('id', id)
      cargarPlatos()
    }
  }

  const editarPlato = (plato) => {
    setForm({ ...plato, precio: plato.precio?.toString() })
    setEditando(plato.id)
    setMostrarForm(true)
  }

  const toggleDisponible = async (plato) => {
    await supabase.from('platos').update({ disponible: !plato.disponible }).eq('id', plato.id)
    cargarPlatos()
  }

  useEffect(() => {
    if (!verificando) cargarPlatos()
  }, [verificando])

  if (verificando) return <div style={{color:'white', padding:'2rem'}}>Verificando...</div>

  const categorias = [...new Set(platos.map(p => p.categoria))]

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #080807; color: white; min-height: 100vh; padding: 2rem; }
        .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .logo { font-family: serif; font-size: 1.5rem; font-weight: 900; }
        .logo span { color: #00E676; }
        .subtitulo { font-size: 0.8rem; color: rgba(255,255,255,0.4); margin-top: 0.2rem; }
        .btn-nuevo { background: #00E676; color: #080807; border: none; padding: 0.6rem 1.4rem; border-radius: 50px; font-size: 0.88rem; font-weight: 700; cursor: pointer; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
        .stat { background: #111110; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 1rem; }
        .stat-num { font-size: 1.8rem; font-weight: 700; color: #00E676; line-height: 1; }
        .stat-label { font-size: 0.75rem; color: rgba(255,255,255,0.4); margin-top: 0.3rem; }
        .categoria-titulo { font-size: 1rem; font-weight: 700; margin: 1.5rem 0 0.8rem; color: rgba(255,255,255,0.7); padding-bottom: 0.4rem; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .platos-lista { display: flex; flex-direction: column; gap: 0.6rem; }
        .plato-row { background: #111110; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 1rem 1.2rem; display: flex; align-items: center; gap: 1rem; }
        .plato-info { flex: 1; }
        .plato-nombre { font-size: 0.92rem; font-weight: 600; }
        .plato-desc { font-size: 0.78rem; color: rgba(255,255,255,0.4); margin-top: 0.2rem; }
        .plato-precio { font-size: 1rem; font-weight: 700; color: #00E676; min-width: 60px; text-align: right; }
        .toggle { width: 40px; height: 22px; border-radius: 11px; border: none; cursor: pointer; transition: background 0.2s; flex-shrink: 0; }
        .toggle.on { background: #00E676; }
        .toggle.off { background: rgba(255,255,255,0.15); }
        .btn-edit { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.6); padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.75rem; cursor: pointer; }
        .btn-delete { background: transparent; border: 1px solid rgba(255,61,61,0.3); color: rgba(255,61,61,0.7); padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.75rem; cursor: pointer; }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 1rem; }
        .modal { background: #111110; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 2rem; width: 100%; max-width: 480px; }
        .modal-titulo { font-size: 1.1rem; font-weight: 700; margin-bottom: 1.5rem; }
        .campo { margin-bottom: 1rem; }
        .campo label { display: block; font-size: 0.78rem; color: rgba(255,255,255,0.5); margin-bottom: 0.3rem; }
        .campo input, .campo select, .campo textarea { width: 100%; background: #080807; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 0.7rem 1rem; font-size: 0.9rem; color: white; font-family: inherit; outline: none; }
        .campo textarea { resize: vertical; min-height: 70px; }
        .campo input:focus, .campo select:focus, .campo textarea:focus { border-color: rgba(0,230,118,0.4); }
        .campo-check { display: flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; }
        .modal-acciones { display: flex; gap: 0.8rem; margin-top: 1.5rem; }
        .btn-guardar { flex: 1; background: #00E676; color: #080807; border: none; padding: 0.8rem; border-radius: 50px; font-size: 0.9rem; font-weight: 700; cursor: pointer; }
        .btn-cancelar { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.6); padding: 0.8rem 1.5rem; border-radius: 50px; font-size: 0.9rem; cursor: pointer; }
        .cargando { text-align: center; padding: 3rem; color: rgba(255,255,255,0.4); }
        .vacio { text-align: center; padding: 3rem; color: rgba(255,255,255,0.3); }
      `}</style>

      <div className="header">
        <div>
          <div className="logo">CERO<span>30</span></div>
          <div className="subtitulo">Gestión del menú</div>
        </div>
        <button className="btn-nuevo" onClick={() => { setEditando(null); setForm({ nombre: '', descripcion: '', precio: '', categoria: '', disponible: true, restaurante_id: 'demo' }); setMostrarForm(true); }}>
          + Nuevo plato
        </button>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-num">{platos.length}</div>
          <div className="stat-label">Total platos</div>
        </div>
        <div className="stat">
          <div className="stat-num">{platos.filter(p => p.disponible).length}</div>
          <div className="stat-label">Disponibles</div>
        </div>
        <div className="stat">
          <div className="stat-num">{categorias.length}</div>
          <div className="stat-label">Categorías</div>
        </div>
      </div>

      {cargando ? (
        <div className="cargando">Cargando platos...</div>
      ) : platos.length === 0 ? (
        <div className="vacio">
          <p style={{fontSize:'2rem', marginBottom:'1rem'}}>🍽️</p>
          <p>No hay platos todavía.</p>
          <p style={{marginTop:'0.5rem', fontSize:'0.82rem'}}>Haz clic en "Nuevo plato" para empezar.</p>
        </div>
      ) : (
        categorias.map(cat => (
          <div key={cat}>
            <div className="categoria-titulo">{cat}</div>
            <div className="platos-lista">
              {platos.filter(p => p.categoria === cat).map(plato => (
                <div className="plato-row" key={plato.id}>
                  <div className="plato-info">
                    <div className="plato-nombre">{plato.nombre}</div>
                    <div className="plato-desc">{plato.descripcion}</div>
                  </div>
                  <div className="plato-precio">€{plato.precio?.toFixed(2)}</div>
                  <button className={`toggle ${plato.disponible ? 'on' : 'off'}`} onClick={() => toggleDisponible(plato)} title={plato.disponible ? 'Disponible' : 'No disponible'} />
                  <button className="btn-edit" onClick={() => editarPlato(plato)}>Editar</button>
                  <button className="btn-delete" onClick={() => eliminarPlato(plato.id)}>Eliminar</button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {mostrarForm && (
        <div className="overlay" onClick={() => setMostrarForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-titulo">{editando ? 'Editar plato' : 'Nuevo plato'}</div>
            <form onSubmit={guardarPlato}>
              <div className="campo">
                <label>Nombre del plato</label>
                <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Burger Clásica" required />
              </div>
              <div className="campo">
                <label>Descripción</label>
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Ingredientes y descripción..." />
              </div>
              <div className="campo">
                <label>Precio (€)</label>
                <input name="precio" type="number" step="0.01" value={form.precio} onChange={handleChange} placeholder="Ej: 9.90" required />
              </div>
              <div className="campo">
                <label>Categoría</label>
                <input name="categoria" value={form.categoria} onChange={handleChange} placeholder="Ej: Hamburguesas, Pizzas, Bebidas..." required />
              </div>
              <div className="campo">
                <label className="campo-check">
                  <input type="checkbox" name="disponible" checked={form.disponible} onChange={handleChange} />
                  Disponible en el menú
                </label>
              </div>
              <div className="modal-acciones">
                <button type="button" className="btn-cancelar" onClick={() => setMostrarForm(false)}>Cancelar</button>
                <button type="submit" className="btn-guardar">
                  {editando ? 'Guardar cambios' : 'Añadir plato'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}