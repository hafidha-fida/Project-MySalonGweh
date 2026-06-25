import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const getBookings = async () => {
    try {
      const res = await api.get("/admin/bookings");

      setBookings(res.data.data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    getBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/bookings/${id}`, {
        status,
      });

      getBookings();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Yakin ingin menghapus booking ini?")) return;

    try {
      await api.delete(`/admin/bookings/${id}`);

      getBookings();
    } catch (err) {
      console.log(err);
    }
  };

  const getBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning text-dark";

      case "confirmed":
        return "bg-primary";

      case "completed":
        return "bg-success";

      case "cancelled":
        return "bg-danger";

      default:
        return "bg-secondary";
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchName = booking.customer_name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus = filterStatus === "" || booking.status === filterStatus;

    return matchName && matchStatus;
  });

  const totalBooking = bookings.length;

  const pendingBooking = bookings.filter((b) => b.status === "pending").length;

  const confirmedBooking = bookings.filter(
    (b) => b.status === "confirmed",
  ).length;

  const completedBooking = bookings.filter(
    (b) => b.status === "completed",
  ).length;

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Kelola Booking</h2>

          <p className="text-muted mb-0">Manajemen data booking pelanggan</p>
        </div>
      </div>

      {/* Statistik */}

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Total Booking</h6>

              <h3 className="fw-bold">{totalBooking}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Pending</h6>

              <h3 className="fw-bold text-warning">{pendingBooking}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Confirmed</h6>

              <h3 className="fw-bold text-primary">{confirmedBooking}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Completed</h6>

              <h3 className="fw-bold text-success">{completedBooking}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Cari nama pelanggan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">Semua Status</option>

                <option value="pending">Pending</option>

                <option value="confirmed">Confirmed</option>

                <option value="completed">Completed</option>

                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>

                  <th>Customer</th>

                  <th>Layanan</th>

                  <th>Tanggal</th>

                  <th>Jam</th>

                  <th>Status</th>

                  <th width="180">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <strong>#{booking.id}</strong>
                      </td>

                      <td>{booking.customer_name}</td>

                      <td>{booking.service?.nama_layanan}</td>

                      <td>{booking.booking_date}</td>

                      <td>{booking.booking_time}</td>

                      <td>
                        <span className={`badge ${getBadge(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>

                      <td>
                        <select
                          className="form-select form-select-sm mb-2"
                          value={booking.status}
                          onChange={(e) =>
                            updateStatus(booking.id, e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>

                          <option value="confirmed">Confirmed</option>

                          <option value="completed">Completed</option>

                          <option value="cancelled">Cancelled</option>
                        </select>

                        <button
                          className="btn btn-danger btn-sm w-100"
                          onClick={() => deleteBooking(booking.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      Tidak ada data booking
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
