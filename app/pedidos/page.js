'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [filtro, setFiltro] = useState('todos')

  useEffect(() => {
    cargarPedidos()
    const intervalo = setInterval(cargarPedidos, 15000)
    return () => clearInterval(intervalo)
  }, [])

  const cargarPedidos = async () => {
    const { data } = await supabase
      .from('pedidos')
      .select('*')
    setPedidos(data || [])
    setCargando(false)
  }

  const cambiarEstado = async (id, nuevoEstado) => {
    await supabase
      .from('pedidos')
      .update({ estado: nuevoEstado })
      .eq('id', id)
    cargarPedidos()
  }

  const pedidosFiltrados = filtro === 'todos'
    ? pedidos
    : pedidos.filter(p => p.estado === filtro)

  const contarPorEstado = (estado) => pedidos.filter(p => p.estado === estado).length

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #080807; color: white; min-height: 100vh; padding: 2rem; }
        .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.07); flex-wrap: wrap; gap: 1rem; }
        .logo { font-family: serif; font-size: 1.5rem; font-weight: 900; }
        .logo span { color: #00E676; }
        .subtitulo { font-size: 0.8rem; color: rgba(255,255,255,0.4); margin-top: 0.2rem; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
        .stat { background: #111110; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 1rem; }
        .stat-num { font-size: 1.8rem; font-weight: 700; line-height: 1; }
        .stat-label { font-size: 0.75rem; color: rgba(255,255,255,0.4); margin-top: 0.3rem; }
        .filtros { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
        .filtro-btn { padding: 0.4rem 1rem; border-radius: 50px; border: 1px solid rgba(255,255,255,0.15); background: transparent; color: rgba(255,255,255,0.6); font-size: 0.82rem; cursor: pointer; transition: all 0.2s; }
        .filtro-btn.activo { background: #00E676; color: #080807; border-color: #00E676; font-weight: 600; }
        .pedidos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; }
        .pedido-card { background: #111110; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 1.2rem; display: flex; flex-direction: column; gap: 0.8rem; }
        .pedido-card.nuevo { border-color: rgba(0,230,118,0.4); }
        .pedido-card.preparando { border-color: rgba(255,200,50,0.4); }
        .pedido-card.entregado { border-color: rgba(255,255,255,0.1); opacity: 0.6; }
        .pedido-header { display: flex; align-items: center; justify-content: space-between; }
        .pedido-id { font-size: 0.75rem; color: rgba(255,255,255,0.3); }
        .badge { padding: 0.2rem 0.7rem; border-radius: 50px; font-size: 0.72rem; font-weight: 600; }
        .badge-nuevo { background: rgba(0,230,118,0.15); color: #00E676; }
        .badge-preparando { background: rgba(255,200,50,0.15); color: #EF9F27; }
        .badge-listo { background: rgba(100,150,255,0.15); color: #6496FF; }
        .badge-entregado { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.4); }
        .pedido-cliente { font-size: 0.9rem; font-weight: 600; }
        .pedido-info { font-size: 0.78rem; color: rgba(255,255,255,0.45); line-height: 1.6; }
        .pedido-items { background: rgba(255,255,255,0.03); border-radius: 8px; padding: 0.7rem; font-size: 0.8rem; color: rgba(255,255,255,0.6); line-height: 1.8; }
        .pedido-total { font-size: 1rem; font-weight: 700; color: #00E676; }
        .acciones { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .btn-accion { flex: 1; padding: 0.5rem; border-radius: 8px; border: none; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: opacity 0.2s; }
        .btn-accion:hover { opacity: 0.85; }
        .btn-preparando { background: rgba(255,200,50,0.2); color: #EF9F27; border: 1px solid rgba(255,200,50,0.3); }
        .btn-listo { background: rgba(100,150,255,0.2); color: #6496FF; border: 1px solid rgba(100,150,255,0.3); }
        .btn-entregado { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.1); }
        .cargando { text-align: center; padding: 3rem; color: rgba(255,255,255,0.4); }
        .vacio { text-align: center; padding: 3rem; color: rgba(255,255,255,0.3); }
        .btn-refresh { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.6); padding: 0.45rem 1rem; border-radius: 50px; font-size: 0.8rem; cursor: pointer; }
        .auto-refresh { font-size: 0.72rem; color: rgba(255,255,255,0.25); margin-top: 0.3rem; text-align: right; }
      `}</style>

      <div className="header">
        <div>
          <div className="logo">CERO<span>30</span></div>
          <div className="subtitulo">Panel de pedidos</div>
        </div>
        <div style={{textAlign:'right'}}>
          <button className="btn-refresh" onClick={cargarPedidos}>↻ Actualizar</button>
          <div className="auto-refresh">Se actualiza cada 15 segundos</div>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-num" style={{color:'#00E676'}}>{contarPorEstado('nuevo')}</div>
          <div className="stat-label">Nuevos</div>
        </div>
        <div className="stat">
          <div className="stat-num" style={{color:'#EF9F27'}}>{contarPorEstado('preparando')}</div>
          <div className="stat-label">Preparando</div>
        </div>
        <div className="stat">
          <div className="stat-num" style={{color:'#6496FF'}}>{contarPorEstado('listo')}</div>
          <div className="stat-label">Listos</div>
        </div>
        <div className="stat">
          <div className="stat-num">{pedidos.length}</div>
          <div className="stat-label">Total hoy</div>
        </div>
      </div>

      <div className="filtros">
        {['todos','nuevo','preparando','listo','entregado'].map(f => (
          <button
            key={f}
            className={`filtro-btn ${filtro === f ? 'activo' : ''}`}
            onClick={() => setFiltro(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {cargando ? (
        <div className="cargando">Cargando pedidos...</div>
      ) : pedidosFiltrados.length === 0 ? (
        <div className="vacio">
          <p style={{fontSize:'2rem', marginBottom:'1rem'}}>📋</p>
          <p>No hay pedidos {filtro !== 'todos' ? `con estado "${filtro}"` : 'todavía'}</p>
        </div>
      ) : (
        <div className="pedidos-grid">
          {pedidosFiltrados.map(p => (
            <div key={p.id} className={`pedido-card ${p.estado}`}>
              <div className="pedido-header">
                <span className="pedido-id">#{p.id?.slice(0,8)}</span>
                <span className={`badge badge-${p.estado}`}>{p.estado}</span>
              </div>
              <div className="pedido-cliente">👤 {p.cliente_nombre}</div>
              <div className="pedido-info">
                📞 {p.cliente_telefono}<br/>
                📍 {p.direccion}
              </div>
              <div className="pedido-items">
                {p.items && JSON.parse(p.items).map((item, i) => (
                  <div key={i}>{item.cantidad}x {item.nombre} — €{(item.precio * item.cantidad).toFixed(2)}</div>
                ))}
              </div>
              <div className="pedido-total">Total: €{p.total?.toFixed(2)}</div>
              <div className="acciones">
                {p.estado === 'nuevo' && (
                  <button className="btn-accion btn-preparando" onClick={() => cambiarEstado(p.id, 'preparando')}>
                    🍳 Preparando
                  </button>
                )}
                {p.estado === 'preparando' && (
                  <button className="btn-accion btn-listo" onClick={() => cambiarEstado(p.id, 'listo')}>
                    ✅ Listo
                  </button>
                )}
                {p.estado === 'listo' && (
                  <button className="btn-accion btn-entregado" onClick={() => cambiarEstado(p.id, 'entregado')}>
                    🛵 Entregado
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}