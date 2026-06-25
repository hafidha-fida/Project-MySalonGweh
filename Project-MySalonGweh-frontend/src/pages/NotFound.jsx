import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff5f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "#fff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "80px",
            color: "#ff4fa3",
            margin: 0,
          }}
        >
          404
        </h1>

        <h2>Halaman Tidak Ditemukan</h2>

        <p>Maaf, halaman yang Anda cari tidak tersedia.</p>

        <Link
          to="/"
          style={{
            display: "inline-block",
            marginTop: "20px",
            padding: "12px 25px",
            background: "#ff4fa3",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "10px",
          }}
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
