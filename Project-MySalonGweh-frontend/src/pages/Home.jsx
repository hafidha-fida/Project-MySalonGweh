import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Home() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get("/services");
      setServices(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#fff0f6 0%,#ffe4ef 50%,#fff7fb 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND BLOB */}
      <div
        style={{
          position: "fixed",
          top: "-150px",
          left: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(255,79,163,.15)",
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "fixed",
          bottom: "-150px",
          right: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(255,182,193,.2)",
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />

      {/* NAVBAR */}
      <nav
        style={{
          background: "rgba(255,255,255,.8)",
          backdropFilter: "blur(15px)",
          padding: "20px 80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 5px 20px rgba(0,0,0,.05)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <h2
          style={{
            color: "#ff4fa3",
            margin: 0,
            fontWeight: "700",
          }}
        >
          💇‍♀️ MySalonGweh
        </h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
          }}
        >
          <button className="btn-pink" onClick={() => navigate("/booking")}>
            Booking
          </button>

          <button className="btn-pink" onClick={() => navigate("/admin-login")}>
            Admin
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          textAlign: "center",
          padding: "120px 20px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "#ffe1ef",
            color: "#ff4fa3",
            padding: "10px 25px",
            borderRadius: "50px",
            marginBottom: "25px",
            fontWeight: "600",
          }}
        >
          ✨ Salon Premium & Modern
        </div>

        <h1
          style={{
            fontSize: "70px",
            color: "#ff4fa3",
            marginBottom: "20px",
            fontWeight: "700",
          }}
        >
          MySalonGweh
        </h1>

        <p
          style={{
            maxWidth: "750px",
            margin: "auto",
            color: "#666",
            fontSize: "20px",
            lineHeight: "1.8",
          }}
        >
          Booking layanan salon favoritmu secara online, bayar langsung
          menggunakan Midtrans dan dapatkan nomor antrian otomatis setelah
          pembayaran berhasil.
        </p>

        <div
          style={{
            marginTop: "35px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <button className="btn-pink" onClick={() => navigate("/booking")}>
            Booking Sekarang 💖
          </button>

          <button
            onClick={() =>
              window.scrollTo({
                top: 900,
                behavior: "smooth",
              })
            }
            style={{
              padding: "14px 25px",
              borderRadius: "14px",
              border: "2px solid #ff4fa3",
              background: "white",
              color: "#ff4fa3",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Lihat Layanan
          </button>
        </div>
      </section>

      {/* STATISTIK */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          padding: "0 20px 80px",
        }}
      >
        <div className="card">
          <h1 style={{ color: "#ff4fa3" }}>50+</h1>
          <p>Jenis Layanan Salon</p>
        </div>

        <div className="card">
          <h1 style={{ color: "#ff4fa3" }}>1000+</h1>
          <p>Pelanggan Puas</p>
        </div>

        <div className="card">
          <h1 style={{ color: "#ff4fa3" }}>24/7</h1>
          <p>Booking Online</p>
        </div>
      </section>

      {/* KEUNGGULAN */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "0 20px 80px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#d63384",
            marginBottom: "40px",
            fontSize: "40px",
          }}
        >
          💖 Kenapa Pilih Kami?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px",
          }}
        >
          <div className="card">
            <h2>💇 Stylist Profesional</h2>
            <p>Ditangani langsung oleh stylist berpengalaman.</p>
          </div>

          <div className="card">
            <h2>📱 Booking Online</h2>
            <p>Booking kapan saja tanpa harus datang ke salon.</p>
          </div>

          <div className="card">
            <h2>💳 Pembayaran Mudah</h2>
            <p>Pembayaran aman menggunakan Midtrans.</p>
          </div>

          <div className="card">
            <h2>🎟️ Nomor Antrian</h2>
            <p>Dapatkan nomor antrian otomatis setelah pembayaran.</p>
          </div>
        </div>
      </section>

      {/* JUDUL LAYANAN */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        <h2
          style={{
            color: "#d63384",
            fontSize: "42px",
          }}
        >
          ✂️ Daftar Layanan
        </h2>
      </div>

      {/* SERVICES */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "25px",
          padding: "0 20px 80px",
        }}
      >
        {services.map((service) => (
          <div key={service.id} className="card">
            <div
              style={{
                height: "180px",
                background: "linear-gradient(135deg,#ff4fa3,#ff8fc6)",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "70px",
                marginBottom: "20px",
              }}
            >
              💇‍♀️
            </div>

            <h2
              style={{
                color: "#d63384",
              }}
            >
              {service.nama_layanan}
            </h2>

            <h3
              style={{
                color: "#ff4fa3",
                marginTop: "10px",
              }}
            >
              Rp {Number(service.harga).toLocaleString("id-ID")}
            </h3>

            <p
              style={{
                color: "#666",
                marginTop: "10px",
              }}
            >
              ⏱️ {service.durasi} Menit
            </p>

            <p
              style={{
                marginTop: "15px",
                color: "#777",
                lineHeight: "1.8",
                minHeight: "70px",
              }}
            >
              {service.deskripsi}
            </p>

            <button
              className="btn-pink"
              style={{
                width: "100%",
                marginTop: "20px",
              }}
              onClick={() => navigate(`/booking/${service.id}`)}
            >
              Booking Sekarang
            </button>
          </div>
        ))}
      </section>

      {/* WAVE */}
      <div style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 320">
          <path
            fill="#ff4fa3"
            fillOpacity="1"
            d="M0,128L60,144C120,160,240,192,360,202.7C480,213,600,203,720,176C840,149,960,107,1080,106.7C1200,107,1320,149,1380,170.7L1440,192L1440,320L0,320Z"
          />
        </svg>
      </div>

      {/* CTA */}
      <section
        style={{
          background: "#ff4fa3",
          color: "white",
          textAlign: "center",
          padding: "80px 20px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
          }}
        >
          Siap Tampil Lebih Cantik? 💖
        </h1>

        <p
          style={{
            marginTop: "15px",
            fontSize: "18px",
          }}
        >
          Booking sekarang dan nikmati pelayanan salon terbaik.
        </p>

        <button
          onClick={() => navigate("/booking")}
          style={{
            marginTop: "25px",
            padding: "15px 35px",
            borderRadius: "15px",
            border: "none",
            background: "white",
            color: "#ff4fa3",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Booking Sekarang
        </button>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "white",
          textAlign: "center",
          padding: "25px",
          color: "#999",
        }}
      >
        © 2026 MySalonGweh • Salon Booking System
      </footer>
    </div>
  );
}
