import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout() {
  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <AdminSidebar />

      <div className="flex-grow-1">
        {/* TOPBAR */}

        <div
          className="bg-white shadow-sm px-4 py-3"
          style={{
            borderBottom: "1px solid #eee",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold">Dashboard Admin</h5>

            <div className="d-flex align-items-center gap-3">
              🔔
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                width="40"
                className="rounded-circle"
              />
            </div>
          </div>
        </div>

        {/* CONTENT */}

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
