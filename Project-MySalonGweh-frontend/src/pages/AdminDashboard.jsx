import { useEffect, useState } from "react";
import axios from "../api/axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
);

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState({
    total_services: 0,
    total_bookings: 0,
    total_payments: 0,
    pending_bookings: 0,
  });

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadDashboard();
    loadBookings();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await axios.get("/admin/dashboard");

      setDashboard({
        total_services: res.data.data.total_service,
        total_bookings: res.data.data.total_booking,
        total_payments: res.data.data.total_payment,
        pending_bookings: res.data.data.booking_pending,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const loadBookings = async () => {
    try {
      const res = await axios.get("/admin/bookings");

      setBookings(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const bookingChart = {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],

    datasets: [
      {
        label: "Booking",
        data: [4, 8, 5, 12, 9, 15, 10],

        borderColor: "#ec4899",

        backgroundColor: "#ec4899",

        tension: 0.4,
      },
    ],
  };

  const paymentChart = {
    labels: ["Paid", "Pending", "Failed"],

    datasets: [
      {
        data: [12, 5, 2],

        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
      },
    ],
  };

  return (
    <div className="container-fluid">
      {/* HEADER */}

      <div className="mb-4">
        <h2 className="fw-bold">Dashboard Admin</h2>

        <p className="text-muted">Monitoring sistem MySalonGweh</p>
      </div>

      {/* STAT CARD */}

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div
            className="card border-0 shadow-lg text-white"
            style={{
              background: "linear-gradient(135deg,#ec4899,#db2777)",
              borderRadius: "20px",
            }}
          >
            <div className="card-body">
              <h6>Total Layanan</h6>

              <h2>{dashboard.total_services}</h2>

              <span>💇</span>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card border-0 shadow-lg text-white"
            style={{
              background: "linear-gradient(135deg,#22c55e,#16a34a)",
              borderRadius: "20px",
            }}
          >
            <div className="card-body">
              <h6>Total Booking</h6>

              <h2>{dashboard.total_bookings}</h2>

              <span>📅</span>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card border-0 shadow-lg text-white"
            style={{
              background: "linear-gradient(135deg,#3b82f6,#2563eb)",
              borderRadius: "20px",
            }}
          >
            <div className="card-body">
              <h6>Total Pembayaran</h6>

              <h2>{dashboard.total_payments}</h2>

              <span>💳</span>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card border-0 shadow-lg text-white"
            style={{
              background: "linear-gradient(135deg,#f59e0b,#d97706)",
              borderRadius: "20px",
            }}
          >
            <div className="card-body">
              <h6>Pending</h6>

              <h2>{dashboard.pending_bookings}</h2>

              <span>⏳</span>
            </div>
          </div>
        </div>
      </div>

      {/* CHART */}

      <div className="row g-4 mb-4">
        <div className="col-md-8">
          <div
            className="card border-0 shadow"
            style={{
              borderRadius: "20px",
            }}
          >
            <div className="card-body">
              <h5 className="fw-bold mb-4">Grafik Booking Mingguan</h5>

              <Line data={bookingChart} />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card border-0 shadow"
            style={{
              borderRadius: "20px",
            }}
          >
            <div className="card-body">
              <h5 className="fw-bold mb-4">Status Pembayaran</h5>

              <Doughnut data={paymentChart} />
            </div>
          </div>
        </div>
      </div>

      {/* BOOKING TERBARU */}

      <div
        className="card border-0 shadow"
        style={{
          borderRadius: "20px",
        }}
      >
        <div className="card-body">
          <h5 className="fw-bold mb-4">Booking Terbaru</h5>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Layanan</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {bookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>

                    <td>{booking.customer_name}</td>

                    <td>{booking.service?.nama_layanan}</td>

                    <td>{booking.booking_date}</td>

                    <td>
                      <span
                        className={`badge ${
                          booking.status === "confirmed"
                            ? "bg-success"
                            : booking.status === "pending"
                              ? "bg-warning"
                              : "bg-danger"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
