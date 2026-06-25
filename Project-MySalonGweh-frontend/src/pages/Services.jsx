import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Services() {
  const [services, setServices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    try {
      const response = await api.get("/services");
      setServices(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>💇‍♀️ Layanan MySalonGweh</h1>
        <p>Pilih layanan terbaik untuk tampil lebih cantik</p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            {service.image_url && (
              <img
                src={service.image_url}
                alt={service.nama_layanan}
                className="service-image"
              />
            )}

            <h2>{service.nama_layanan}</h2>

            <h3>Rp {Number(service.harga).toLocaleString("id-ID")}</h3>

            <p>⏱️ {service.durasi} menit</p>

            <p className="description">{service.deskripsi}</p>

            <button className="btn-pink" onClick={() => navigate("/booking")}>
              Booking Sekarang
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
