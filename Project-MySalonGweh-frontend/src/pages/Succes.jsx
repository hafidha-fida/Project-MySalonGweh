import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function Success() {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const response = await api.get(`/bookings/${id}`);

      setBooking(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!booking) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff5f8",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,.1)",
        }}
      >
        <h1>🎉 Pembayaran Berhasil</h1>

        <h2>{booking.customer_name}</h2>

        <p>Nomor Antrian:</p>

        <h1
          style={{
            color: "#ff4fa3",
            fontSize: "50px",
          }}
        >
          {booking.queue_number}
        </h1>

        <p>Status: {booking.status}</p>
      </div>
    </div>
  );
}

export default Success;
