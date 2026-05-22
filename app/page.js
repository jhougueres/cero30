export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#080807",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif",
      textAlign: "center",
      padding: "2rem"
    }}>
      <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>
        CERO<span style={{ color: "#00E676" }}>30</span>
      </h1>
      <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "500px" }}>
        Delivery para tu restaurante sin el 30% de comisión de Glovo y Uber Eats.
      </p>
      <div style={{
        marginTop: "2rem",
        background: "rgba(0,230,118,0.1)",
        border: "1px solid rgba(0,230,118,0.3)",
        borderRadius: "12px",
        padding: "1rem 2rem",
        color: "#00E676"
      }}>
        🚀 Plataforma en construcción — Granada, España
      </div>
    </main>
  );
}