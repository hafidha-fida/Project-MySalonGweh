import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const loadPayments = async () => {
    try {
      const res = await axios.get(
        "/admin/payments",
        config
      );

      setPayments(res.data.data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `/admin/payments/${id}`,
        {
          payment_status: status,
        },
        config
      );

      loadPayments();
    } catch (err) {
      console.log(err);
    }
  };

  const deletePayment = async (id) => {
    if (
      !window.confirm(
        "Yakin ingin menghapus pembayaran ini?"
      )
    )
      return;

    try {
      await axios.delete(
        `/admin/payments/${id}`,
        config
      );

      loadPayments();
    } catch (err) {
      console.log(err);
    }
  };

  const badgeColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-success";

      case "pending":
        return "bg-warning text-dark";

      case "failed":
        return "bg-danger";

      default:
        return "bg-secondary";
    }
  };

  const filteredPayments = payments.filter(
    (payment) => {
      const matchName =
        payment.booking?.customer_name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        filterStatus === "" ||
        payment.payment_status ===
          filterStatus;

      return matchName && matchStatus;
    }
  );

  const totalPayments = payments.length;

  const paidPayments = payments.filter(
    (p) => p.payment_status === "paid"
  ).length;

  const pendingPayments = payments.filter(
    (p) => p.payment_status === "pending"
  ).length;

  const failedPayments = payments.filter(
    (p) => p.payment_status === "failed"
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

      <div className="mb-4">
        <h2 className="fw-bold">
          Kelola Pembayaran
        </h2>

        <p className="text-muted">
          Manajemen transaksi pembayaran salon
        </p>
      </div>

      {/* Statistik */}

      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">
                Total Pembayaran
              </h6>

              <h3 className="fw-bold">
                {totalPayments}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">
                Paid
              </h6>

              <h3 className="fw-bold text-success">
                {paidPayments}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">
                Pending
              </h6>

              <h3 className="fw-bold text-warning">
                {pendingPayments}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">
                Failed
              </h6>

              <h3 className="fw-bold text-danger">
                {failedPayments}
              </h3>
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
                placeholder="Cari customer..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Semua Status
                </option>

                <option value="paid">
                  Paid
                </option>

                <option value="pending">
                  Pending
                </option>

                <option value="failed">
                  Failed
                </option>
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

                  <th>Jumlah</th>

                  <th>Status</th>

                  <th>Transaction ID</th>

                  <th width="220">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>

                {filteredPayments.length >
                0 ? (
                  filteredPayments.map(
                    (payment) => (
                      <tr key={payment.id}>

                        <td>
                          <strong>
                            #{payment.id}
                          </strong>
                        </td>

                        <td>
                          {
                            payment.booking
                              ?.customer_name
                          }
                        </td>

                        <td>
                          {
                            payment.booking
                              ?.service
                              ?.nama_layanan
                          }
                        </td>

                        <td>
                          Rp{" "}
                          {Number(
                            payment.amount
                          ).toLocaleString(
                            "id-ID"
                          )}
                        </td>

                        <td>
                          <span
                            className={`badge ${badgeColor(
                              payment.payment_status
                            )}`}
                          >
                            {
                              payment.payment_status
                            }
                          </span>
                        </td>

                        <td>
                          {
                            payment.transaction_id
                          }
                        </td>

                        <td>

                          <select
                            className="form-select form-select-sm mb-2"
                            value={
                              payment.payment_status
                            }
                            onChange={(e) =>
                              updateStatus(
                                payment.id,
                                e.target.value
                              )
                            }
                          >
                            <option value="pending">
                              Pending
                            </option>

                            <option value="paid">
                              Paid
                            </option>

                            <option value="failed">
                              Failed
                            </option>
                          </select>

                          <button
                            onClick={() =>
                              deletePayment(
                                payment.id
                              )
                            }
                            className="btn btn-danger btn-sm w-100"
                          >
                            Hapus
                          </button>

                        </td>

                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-4"
                    >
                      Tidak ada data pembayaran
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