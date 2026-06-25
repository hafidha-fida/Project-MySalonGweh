import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      if (user.role !== "admin") {
        alert("Akses hanya untuk Admin");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login Admin Berhasil 🎉");

      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);

      if (!error.response) {
        alert("Backend belum berjalan");
      } else {
        alert(error.response.data.message || "Email atau Password salah");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#fff0f6,#ffe4ef,#ffd6e8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "#fff",
          padding: "40px",
          borderRadius: "25px",
          boxShadow: "0 15px 40px rgba(214,51,132,.15)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              color: "#d63384",
              marginBottom: "10px",
            }}
          >
            💇‍♀️ MySalonGweh
          </h1>

          <p style={{ color: "#777" }}>Admin Login Panel</p>
        </div>

        <form onSubmit={submit}>
          <div style={{ marginBottom: "20px" }}>
            <label>Email</label>

            <input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "8px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label>Password</label>

            <input
              type="password"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "8px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              background: "linear-gradient(135deg,#d63384,#ff4fa3)",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {loading ? "Loading..." : "Login Admin"}
          </button>
        </form>

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#777",
            fontSize: "14px",
          }}
        >
          Login hanya untuk Administrator
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
