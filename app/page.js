export default function Home() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --negro: #080807; --negro2: #111110; --negro3: #1A1916;
          --borde: rgba(255,255,255,0.07); --verde: #00E676;
          --verde-dim: rgba(0,230,118,0.12); --rojo: #FF3D3D;
          --blanco: #FFFFFF; --gris: rgba(255,255,255,0.45); --r: 14px;
        }
        html { scroll-behavior: smooth; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--negro); color: var(--blanco); overflow-x: hidden; }
        nav { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 6vw; border-bottom: 1px solid var(--borde); background: rgba(8,8,7,0.9); position: sticky; top: 0; z-index: 99; backdrop-filter: blur(10px); }
        .logo-text { font-family: 'Bebas Neue', sans-serif; font-size: 1.9rem; letter-spacing: 1px; color: var(--blanco); text-decoration: none; }
        .logo-text span { color: var(--verde); }
        .btn-nav { background: var(--verde); color: var(--negro); border: none; padding: .55rem 1.3rem; border-radius: 50px; font-size: .85rem; font-weight: 600; cursor: pointer; text-decoration: none; }
        .hero { min-height: 92vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 5rem 6vw 4rem; position: relative; overflow: hidden; }
        .hero-glow { position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(0,230,118,0.07) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%,-50%); pointer-events: none; }
        .hero-pill { display: inline-flex; align-items: center; gap: .5rem; background: var(--verde-dim); border: 1px solid rgba(0,230,118,0.25); padding: .35rem 1rem; border-radius: 50px; font-size: .78rem; color: var(--verde); margin-bottom: 2rem; }
        h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3.5rem, 10vw, 8rem); line-height: .95; letter-spacing: 1px; margin-bottom: 1.5rem; position: relative; z-index: 1; }
        .tachado { position: relative; display: inline-block; color: var(--rojo); }
        .tachado::after { content: ''; position: absolute; left: -4px; right: -4px; top: 50%; height: 6px; background: var(--rojo); transform: rotate(-3deg); border-radius: 3px; }
        .hero-sub { font-size: clamp(.95rem, 1.5vw, 1.15rem); color: var(--gris); max-width: 560px; line-height: 1.75; margin-bottom: 2.5rem; font-weight: 300; position: relative; z-index: 1; }
        .hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; position: relative; z-index: 1; }
        .btn-verde { background: var(--verde); color: var(--negro); padding: .9rem 2.2rem; border-radius: 50px; font-size: 1rem; font-weight: 600; border: none; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn-outline { background: transparent; color: var(--blanco); padding: .9rem 2.2rem; border-radius: 50px; font-size: 1rem; font-weight: 400; border: 1px solid rgba(255,255,255,0.18); cursor: pointer; text-decoration: none; display: inline-block; }
        .seccion { padding: 5rem 6vw; }
        .inner { max-width: 1160px; margin: 0 auto; }
        .tag { font-size: .75rem; letter-spacing: 2px; text-transform: uppercase; color: var(--verde); margin-bottom: .8rem; font-weight: 500; }
        h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.05; letter-spacing: .5px; margin-bottom: .8rem; }
        .sub { font-size: .95rem; color: var(--gris); line-height: 1.75; font-weight: 300; max-width: 500px; }
        .comparativa { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5px; background: var(--borde); border-radius: var(--r); overflow: hidden; margin-top: 3rem; }
        .comp-lado { padding: 2.5rem; }
        .comp-malo { background: #120D0D; }
        .comp-bueno { background: #0A120E; }
        .comp-titulo { font-family: 'Bebas Neue', sans-serif; font-size: 1.3rem; letter-spacing: .5px; margin-bottom: 1.5rem; display: flex; align-items: center; gap: .6rem; }
        .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
        .comp-item { display: flex; align-items: flex-start; gap: .7rem; font-size: .88rem; line-height: 1.6; margin-bottom: .9rem; font-weight: 300; }
        .comp-mal { color: rgba(255,61,61,.7); }
        .comp-bien { color: rgba(0,230,118,.8); }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5px; background: var(--borde); border-radius: var(--r); overflow: hidden; margin-top: 3rem; }
        .feat { background: var(--negro3); padding: 1.8rem; }
        .feat-ico { width: 44px; height: 44px; background: var(--verde-dim); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-bottom: 1rem; }
        .feat h3 { font-size: 1rem; font-weight: 600; margin-bottom: .4rem; }
        .feat p { font-size: .85rem; color: var(--gris); line-height: 1.7; font-weight: 300; }
        .precios-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
        .plan { background: var(--negro2); border: 1px solid var(--borde); border-radius: var(--r); padding: 2rem; display: flex; flex-direction: column; }
        .plan.destacado { border-color: rgba(0,230,118,.35); }
        .plan-badge { display: inline-block; background: var(--verde); color: var(--negro); font-size: .7rem; font-weight: 700; padding: .2rem .7rem; border-radius: 50px; margin-bottom: .5rem; width: fit-content; }
        .plan-nombre { font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem; }
        .plan-precio { font-family: 'Bebas Neue', sans-serif; font-size: 3rem; line-height: 1; margin: .3rem 0; }
        .plan-precio span { font-family: sans-serif; font-size: .9rem; font-weight: 300; color: var(--gris); }
        .plan-desc { font-size: .82rem; color: var(--gris); font-weight: 300; margin-bottom: .5rem; }
        .plan-lista { list-style: none; display: flex; flex-direction: column; gap: .55rem; flex: 1; }
        .plan-lista li { font-size: .83rem; color: rgba(255,255,255,.65); display: flex; gap: .5rem; font-weight: 300; }
        .check { color: var(--verde); }
        .btn-plan { margin-top: 1.5rem; width: 100%; padding: .8rem; border-radius: 50px; font-size: .88rem; font-weight: 600; cursor: pointer; border: 1px solid rgba(255,255,255,.15); background: transparent; color: var(--blanco); }
        .btn-plan.verde { background: var(--verde); color: var(--negro); border-color: var(--verde); }
        .cta-final { text-align: center; padding: 6rem 6vw; border-top: 1px solid var(--borde); }
        footer { background: var(--negro); border-top: 1px solid var(--borde); padding: 2rem 6vw; text-align: center; font-size: .78rem; color: rgba(255,255,255,.2); }
        @media(max-width: 768px) { .comparativa { grid-template-columns: 1fr; } }
      `}</style>

      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav>
        <a href="#" className="logo-text">CERO<span>30</span></a>
        <a href="#registro" className="btn-nav">Empieza gratis</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="hero-pill">📍 Lanzando en Granada, España</div>
        <h1>
          TU DELIVERY.<br/>
          <span className="tachado">30%</span><br/>
          DE COMISIÓN.
        </h1>
        <p className="hero-sub">
          Las grandes plataformas de reparto se llevan hasta el 30% de cada pedido que tú preparas con tus manos. Con Cero30, ese dinero vuelve a tu caja.
        </p>
        <div className="hero-ctas">
          <a href="#registro" className="btn-verde">Crea tu restaurante gratis →</a>
          <a href="#funciones" className="btn-outline">Ver cómo funciona</a>
        </div>
      </section>

      {/* COMPARATIVA */}
      <section className="seccion" style={{background: 'var(--negro2)'}}>
        <div className="inner">
          <p className="tag">La diferencia</p>
          <h2>Antes y después de Cero30</h2>
          <p className="sub">El mismo restaurante, los mismos pedidos. Pero quedándote con lo que es tuyo.</p>
          <div className="comparativa">
            <div className="comp-lado comp-malo">
              <div className="comp-titulo">
                <span className="dot" style={{background: 'var(--rojo)'}}></span>
                CON EL INTERMEDIARIO
              </div>
              <div className="comp-item comp-mal">✗ Pagas hasta el 30% de cada pedido</div>
              <div className="comp-item comp-mal">✗ Ellos controlan tu visibilidad y tus precios</div>
              <div className="comp-item comp-mal">✗ Tus clientes son de ellos, no tuyos</div>
              <div className="comp-item comp-mal">✗ Las comisiones suben sin previo aviso</div>
              <div className="comp-item comp-mal">✗ Sin atención personalizada</div>
            </div>
            <div className="comp-lado comp-bueno">
              <div className="comp-titulo">
                <span className="dot" style={{background: 'var(--verde)'}}></span>
                CON CERO30
              </div>
              <div className="comp-item comp-bien">✓ Cero comisión por pedido. Jamás.</div>
              <div className="comp-item comp-bien">✓ Tus precios, tu marca, tu imagen</div>
              <div className="comp-item comp-bien">✓ Los clientes son tuyos para siempre</div>
              <div className="comp-item comp-bien">✓ Cuota fija mensual, sin sorpresas</div>
              <div className="comp-item comp-bien">✓ Soporte directo y personalizado en Granada</div>
            </div>
          </div>
        </div>
      </section>

      {/* FUNCIONES */}
      <section className="seccion" id="funciones">
        <div className="inner">
          <p className="tag">Funcionalidades</p>
          <h2>Todo lo que necesitas para vender sin intermediarios</h2>
          <p className="sub">Una sola plataforma. Sin apps extras. Sin complicaciones.</p>
          <div className="features-grid">
            {[
              {ico:'🍽️', t:'Menú digital propio', d:'Tu carta online actualizable en tiempo real desde el móvil.'},
              {ico:'💬', t:'Pedidos por WhatsApp', d:'Tus clientes piden desde un enlace directo. Sin descargar ninguna app.'},
              {ico:'🛵', t:'Gestión de repartidores', d:'Asigna pedidos y sigue las rutas en tiempo real.'},
              {ico:'💳', t:'Pagos con Bizum y tarjeta', d:'El dinero va directo a tu cuenta. Configurado para España.'},
              {ico:'📊', t:'Reportes de ventas', d:'Ve qué platos se venden más y en qué horarios pico.'},
              {ico:'🔔', t:'Notificaciones automáticas', d:'Tu cliente recibe el estado de su pedido automáticamente.'},
            ].map((f,i) => (
              <div className="feat" key={i}>
                <div className="feat-ico">{f.ico}</div>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section className="seccion" id="precios" style={{background: 'var(--negro2)'}}>
        <div className="inner">
          <p className="tag">Precios</p>
          <h2>Cuota fija. Cero sorpresas.</h2>
          <p className="sub">Sin comisión por pedido en ningún plan. Lo que vendas es tuyo. Cancela cuando quieras.</p>
          <div className="precios-grid">
            <div className="plan">
              <div className="plan-nombre">Básico</div>
              <div className="plan-precio">€49 <span>/ mes</span></div>
              <div className="plan-desc">Para restaurantes que empiezan con el delivery digital.</div>
              <ul className="plan-lista">
                <li><span className="check">✓</span> Menú digital propio</li>
                <li><span className="check">✓</span> Pedidos por WhatsApp</li>
                <li><span className="check">✓</span> Pagos Bizum y tarjeta</li>
                <li><span className="check">✓</span> Hasta 2 repartidores</li>
              </ul>
              <button className="btn-plan">Empezar gratis 14 días</button>
            </div>
            <div className="plan destacado">
              <div className="plan-badge">Más popular</div>
              <div className="plan-nombre">Pro</div>
              <div className="plan-precio">€99 <span>/ mes</span></div>
              <div className="plan-desc">Para restaurantes con volumen creciente.</div>
              <ul className="plan-lista">
                <li><span className="check">✓</span> Todo lo del Básico</li>
                <li><span className="check">✓</span> Repartidores ilimitados</li>
                <li><span className="check">✓</span> Seguimiento GPS en tiempo real</li>
                <li><span className="check">✓</span> Reportes y analíticas completas</li>
                <li><span className="check">✓</span> Soporte prioritario 7 días</li>
              </ul>
              <button className="btn-plan verde">Probar 14 días gratis</button>
            </div>
            <div className="plan">
              <div className="plan-nombre">Premium</div>
              <div className="plan-precio">€149 <span>/ mes</span></div>
              <div className="plan-desc">Para cadenas con varias sucursales.</div>
              <ul className="plan-lista">
                <li><span className="check">✓</span> Todo lo del Pro</li>
                <li><span className="check">✓</span> Múltiples sucursales</li>
                <li><span className="check">✓</span> IA para sugerencias de pedidos</li>
                <li><span className="check">✓</span> Manager de cuenta dedicado</li>
              </ul>
              <button className="btn-plan">Hablar con el equipo</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-final" id="registro">
        <div className="inner">
          <p className="tag">Únete ahora</p>
          <h2>Empieza hoy. Sin comisiones. Sin excusas.</h2>
          <p className="sub" style={{margin: '1rem auto 2rem', textAlign: 'center'}}>
            Déjanos tu email y te contactamos para ayudarte a montar tu canal de delivery propio en Granada.
          </p>
          <a href="mailto:hola@cero30.es" className="btn-verde">Quiero empezar gratis →</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 Cero30 · Granada, España · Hecho con ❤️ para los restaurantes que luchan</p>
      </footer>
    </>
  );
}