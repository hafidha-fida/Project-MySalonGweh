import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function Booking() {
  const { id } = useParams();
  const [services, setServices] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const [serviceId, setServiceId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  useEffect(() => {
    getServices();
    if (id) {
      setServiceId(id);
    }
  }, [id]);

  const getServices = async () => {
    try {
      const response = await api.get("/services");
      setServices(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      // booking
      const bookingResponse = await api.post("/bookings", {
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        service_id: serviceId,
        booking_date: bookingDate,
        booking_time: bookingTime,
      });

      const bookingId = bookingResponse.data.data.id;

      // create payment
      const paymentResponse = await api.post(`/payments/create/${bookingId}`);

      const snapToken = paymentResponse.data.snap_token;

      // buka popup midtrans
      window.snap.pay(snapToken, {
        onSuccess: function (result) {
          console.log(result);

          alert("Pembayaran berhasil 🎉");

          window.location.href = `/success/${bookingId}`;
        },

        onPending: function (result) {
          console.log(result);

          alert("Menunggu pembayaran");
        },

        onError: function (result) {
          console.log(result);

          alert("Pembayaran gagal");
        },

        onClose: function () {
          alert("Popup pembayaran ditutup");
        },
      });
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Booking gagal");
    }
  };
  return (
    <div className="booking-page">
      <div className="booking-card">
        <h1>💇‍♀️ MySalonGweh</h1>

        <p>Booking salon favoritmu dengan mudah</p>

        <form onSubmit={handleBooking}>
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Nomor HP"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
          />

          <select
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            required
          >
            <option value="">Pilih Layanan</option>

            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.nama_layanan}
                {" - Rp "}
                {Number(service.harga).toLocaleString("id-ID")}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
          />

          <input
            type="time"
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
            required
          />

          <button type="submit" className="btn-pink">
            Booking Sekarang
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;
