'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function Menu() {
  const [platos, setPlatos] = useState([])
  const [carrito, setCarrito] = useState([])
  const [vista, setVista] = useState('menu')
  const [pedido, setPedido] = useState({ nombre: '', telefono: '', direccion: '' })
  const [enviado, setEnviado] = useState(false)
  const [cargando, setCargando] = useState(true)

  const restauranteId = 'demo'

  useEffect(() => {
    cargarPlatos()
  }, [])

  const cargarPlatos = async () => {
    const { data } = await supabase
      .from('platos')
      .select('*')
      .eq('disponible', true)
    setPlatos(data || [])
    setCargando(false)
  }

  const agregarAlCarrito = (plato) => {
    const existe = carrito.find(i => i.id === plato.id)
    if (existe) {
      setCarrito(carrito.map(i => i.id === plato.id ? { ...i, cantidad: i.cantidad + 1 } : i))
    } else {
      setCarrito([...carrito, { ...plato, cantidad: 1 }])
    }
  }

  const quitarDelCarrito = (plato) => {
    const existe = carrito.find(i => i.id === plato.id)
    if (existe.cantidad === 1) {
      setCarrito(carrito.filter(i => i.id !== plato.id))
    } else {
      setCarrito(carrito.map(i => i.id === plato.id ? { ...i, cantidad: i.cantidad - 1 } : i))
    }
  }

  const totalCarrito = carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0)
  const cantidadCarrito = carrito.reduce((acc, i) => acc + i.cantidad, 0)

  const enviarPedido = async (e) => {
    e.preventDefault()
    const items = JSON.stringify(carrito.map(i => ({ nombre: i.nombre, cantidad: i.cantidad, precio: i.precio })))
    const { error } = await supabase.from('pedidos').insert([{
      restaurante_id: restauranteId,
      cliente_nombre: pedido.nombre,
      cliente_telefono: pedido.telefono,
      direccion: pedido.direccion,
      total: totalCarrito,
      estado: 'nuevo',
      items
    }])
    if (!error) setEnviado(true)
  }

  const categorias = [...new Set(platos.map(p => p.categoria))]

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #080807; color: white; min-height: 100vh; }
        .nav { display: flex; align-items: center; justify-content: space-between; padding: 1rem 5vw; background: #111110; border-bottom: 1px solid rgba(255,255,255,0.07); position: sticky; top: 0; z-index: 99; }
        .logo { font-family: serif; font-size: 1.4rem; font-weight: 900; }
        .logo span { color: #00E676; }
        .carrito-btn { background: #00E676; color: #080807; border: none; padding: 0.5rem 1.2rem; border-radius: 50px; font-size: 0.85rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }
        .contenido { max-width: 900px; margin: 0 auto; padding: 2rem 5vw; }
        .categoria-titulo { font-size: 1.1rem; font-weight: 700; margin: 2rem 0 1rem; color: rgba(255,255,255,0.8); padding-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .platos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }
        .plato { background: #111110; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .plato-nombre { font-size: 0.95rem; font-weight: 600; }
        .plato-desc { font-size: 0.8rem; color: rgba(255,255,255,0.45); line-height: 1.5; flex: 1; }
        .plato-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 0.5rem; }
        .plato-precio { font-size: 1rem; font-weight: 700; color: #00E676; }
        .controles { display: flex; align-items: center; gap: 0.5rem; }
        .btn-cantidad { width: 28px; height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: white; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .btn-add { background: #00E676; color: #080807; border: none; padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.8rem; font-weight: 700; cursor: pointer; }
        .cantidad-badge { font-size: 0.85rem; font-weight: 600; min-width: 20px; text-align: center; }
        .cargando { text-align: center; padding: 3rem; color: rgba(255,255,255,0.4); }
        .vacio { text-align: center; padding: 3rem; color: rgba(255,255,255,0.3); }

        /* CARRITO */
        .carrito-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 200; display: flex; justify-content: flex-end; }
        .carrito-panel { background: #111110; width: 100%; max-width: 420px; height: 100%; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; }
        .carrito-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
        .carrito-titulo { font-size: 1.1rem; font-weight: 700; }
        .btn-cerrar { background: transparent; border: none; color: rgba(255,255,255,0.5); font-size: 1.5rem; cursor: pointer; }
        .carrito-item { display: flex; align-items: center; justify-content: space-between; padding: 0.8rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .carrito-item-info { flex: 1; }
        .carrito-item-nombre { font-size: 0.88rem; font-weight: 500; }
        .carrito-item-precio { font-size: 0.78rem; color: rgba(255,255,255,0.45); }
        .carrito-total { display: flex; justify-content: space-between; padding: 1rem 0; font-weight: 700; font-size: 1rem; border-top: 1px solid rgba(255,255,255,0.1); margin-top: auto; }
        .btn-pedir { width: 100%; background: #00E676; color: #080807; border: none; padding: 0.9rem; border-radius: 50px; font-size: 1rem; font-weight: 700; cursor: pointer; margin-top: 1rem; }

        /* FORMULARIO PEDIDO */
        .form-pedido { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; flex: 1; }
        .campo label { display: block; font-size: 0.78rem; color: rgba(255,255,255,0.5); margin-bottom: 0.3rem; }
        .campo input { width: 100%; background: #080807; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 0.7rem 1rem; font-size: 0.9rem; color: white; font-family: inherit; outline: none; }
        .campo input:focus { border-color: rgba(0,230,118,0.4); }
        .enviado { text-align: center; padding: 2rem; }
        .enviado h3 { color: #00E676; font-size: 1.2rem; margin-bottom: 0.5rem; }
        .enviado p { color: rgba(255,255,255,0.5); font-size: 0.88rem; }
      `}</style>

      <div className="nav">
        <div className="logo">CERO<span>30</span></div>
        {cantidadCarrito > 0 && (
          <button className="carrito-btn" onClick={() => setVista('carrito')}>
            🛒 {cantidadCarrito} — €{totalCarrito.toFixed(2)}
          </button>
        )}
      </div>

      <div className="contenido">
        {cargando ? (
          <div className="cargando">Cargando menú...</div>
        ) : platos.length === 0 ? (
          <div className="vacio">
            <p style={{fontSize:'2rem', marginBottom:'1rem'}}>🍽️</p>
            <p>El menú se está preparando.</p>
            <p style={{marginTop:'0.5rem', fontSize:'0.82rem'}}>Vuelve pronto.</p>
          </div>
        ) : (
          categorias.map(cat => (
            <div key={cat}>
              <div className="categoria-titulo">{cat}</div>
              <div className="platos-grid">
                {platos.filter(p => p.categoria === cat).map(plato => {
                  const enCarrito = carrito.find(i => i.id === plato.id)
                  return (
                    <div className="plato" key={plato.id}>
                      <div className="plato-nombre">{plato.nombre}</div>
                      <div className="plato-desc">{plato.descripcion}</div>
                      <div className="plato-footer">
                        <div className="plato-precio">€{plato.precio?.toFixed(2)}</div>
                        {enCarrito ? (
                          <div className="controles">
                            <button className="btn-cantidad" onClick={() => quitarDelCarrito(plato)}>−</button>
                            <span className="cantidad-badge">{enCarrito.cantidad}</span>
                            <button className="btn-cantidad" onClick={() => agregarAlCarrito(plato)}>+</button>
                          </div>
                        ) : (
                          <button className="btn-add" onClick={() => agregarAlCarrito(plato)}>Añadir</button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {vista === 'carrito' && (
        <div className="carrito-overlay" onClick={() => setVista('menu')}>
          <div className="carrito-panel" onClick={e => e.stopPropagation()}>
            <div className="carrito-header">
              <div className="carrito-titulo">
                {enviado ? '✅ Pedido confirmado' : 'Tu pedido'}
              </div>
              <button className="btn-cerrar" onClick={() => { setVista('menu'); setEnviado(false); }}>×</button>
            </div>

            {enviado ? (
              <div className="enviado">
                <h3>¡Pedido recibido!</h3>
                <p>En breve nos ponemos en contacto contigo para confirmar la entrega.</p>
                <button className="btn-pedir" style={{marginTop:'2rem'}} onClick={() => { setVista('menu'); setCarrito([]); setEnviado(false); }}>
                  Volver al menú
                </button>
              </div>
            ) : (
              <>
                {carrito.map(item => (
                  <div className="carrito-item" key={item.id}>
                    <div className="carrito-item-info">
                      <div className="carrito-item-nombre">{item.nombre} x{item.cantidad}</div>
                      <div className="carrito-item-precio">€{(item.precio * item.cantidad).toFixed(2)}</div>
                    </div>
                    <div className="controles">
                      <button className="btn-cantidad" onClick={() => quitarDelCarrito(item)}>−</button>
                      <button className="btn-cantidad" onClick={() => agregarAlCarrito(item)}>+</button>
                    </div>
                  </div>
                ))}

                <div className="carrito-total">
                  <span>Total</span>
                  <span>€{totalCarrito.toFixed(2)}</span>
                </div>

                <form className="form-pedido" onSubmit={enviarPedido}>
                  <div className="campo">
                    <label>Tu nombre</label>
                    <input required placeholder="Ej: Ana García" value={pedido.nombre} onChange={e => setPedido({...pedido, nombre: e.target.value})} />
                  </div>
                  <div className="campo">
                    <label>Teléfono</label>
                    <input required placeholder="Ej: 612 345 678" value={pedido.telefono} onChange={e => setPedido({...pedido, telefono: e.target.value})} />
                  </div>
                  <div className="campo">
                    <label>Dirección de entrega</label>
                    <input required placeholder="Calle, número, piso..." value={pedido.direccion} onChange={e => setPedido({...pedido, direccion: e.target.value})} />
                  </div>
                  <button className="btn-pedir" type="submit">
                    Confirmar pedido →
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}