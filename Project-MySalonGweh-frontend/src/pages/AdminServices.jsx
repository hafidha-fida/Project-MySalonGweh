import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    nama_layanan: "",
    harga: "",
    durasi: "",
    deskripsi: "",
  });

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await axios.get("/services");
      setServices(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setEditingId(null);

    setForm({
      nama_layanan: "",
      harga: "",
      durasi: "",
      deskripsi: "",
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(
          `/services/${editingId}`,
          form,
          config
        );
      } else {
        await axios.post(
          "/services",
          form,
          config
        );
      }

      loadServices();
      resetForm();
      setShowModal(false);
    } catch (err) {
      console.log(err);
      alert("Gagal menyimpan data");
    }
  };

  const editService = (service) => {
    setEditingId(service.id);

    setForm({
      nama_layanan: service.nama_layanan,
      harga: service.harga,
      durasi: service.durasi,
      deskripsi: service.deskripsi,
    });

    setShowModal(true);
  };

  const deleteService = async (id) => {
    if (!window.confirm("Yakin hapus layanan?")) return;

    try {
      await axios.delete(
        `/services/${id}`,
        config
      );

      loadServices();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">
            💇 Kelola Layanan
          </h2>

          <p className="text-muted mb-0">
            Manajemen layanan salon
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          + Tambah Layanan
        </button>
      </div>

      {/* Table */}
      <div className="card shadow border-0">
        <div className="card-body">

          <div className="table-responsive">
            <table className="table table-hover align-middle">

              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nama Layanan</th>
                  <th>Harga</th>
                  <th>Durasi</th>
                  <th>Deskripsi</th>
                  <th width="180">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {services.length > 0 ? (
                  services.map((service) => (
                    <tr key={service.id}>
                      <td>{service.id}</td>

                      <td>
                        <strong>
                          {service.nama_layanan}
                        </strong>
                      </td>

                      <td>
                        Rp{" "}
                        {Number(service.harga).toLocaleString(
                          "id-ID"
                        )}
                      </td>

                      <td>
                        {service.durasi} menit
                      </td>

                      <td>
                        {service.deskripsi}
                      </td>

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            editService(service)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            deleteService(service.id)
                          }
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-4"
                    >
                      Tidak ada layanan
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal d-block"
          style={{
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">

                  {editingId
                    ? "Edit Layanan"
                    : "Tambah Layanan"}

                </h5>

                <button
                  className="btn-close"
                  onClick={() =>
                    setShowModal(false)
                  }
                />
              </div>

              <div className="modal-body">

                <div className="mb-3">
                  <label className="form-label">
                    Nama Layanan
                  </label>

                  <input
                    type="text"
                    name="nama_layanan"
                    value={form.nama_layanan}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Harga
                  </label>

                  <input
                    type="number"
                    name="harga"
                    value={form.harga}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Durasi (menit)
                  </label>

                  <input
                    type="number"
                    name="durasi"
                    value={form.durasi}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Deskripsi
                  </label>

                  <textarea
                    rows="4"
                    name="deskripsi"
                    value={form.deskripsi}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Batal
                </button>

                <button
                  className="btn btn-success"
                  onClick={handleSubmit}
                >
                  Simpan
                </button>

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}