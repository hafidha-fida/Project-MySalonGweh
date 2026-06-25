import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      icon: "📊",
      path: "/admin",
    },
    {
      name: "Layanan",
      icon: "💇",
      path: "/admin/services",
    },
    {
      name: "Booking",
      icon: "📅",
      path: "/admin/bookings",
    },
    {
      name: "Pembayaran",
      icon: "💳",
      path: "/admin/payments",
    },
  ];

  return (
    <div
      style={{
        width: "280px",
        minHeight: "100vh",
        background: "linear-gradient(180deg,#ec4899,#db2777)",
      }}
      className="shadow-lg text-white"
    >
      {/* HEADER */}

      <div className="p-4 border-bottom border-light">
        <h2 className="fw-bold mb-1">💇 MySalonGweh</h2>

        <small
          style={{
            opacity: 0.8,
          }}
        >
          Admin Panel
        </small>
      </div>

      {/* PROFILE */}

      <div className="p-4 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="admin"
          width="80"
          className="rounded-circle border border-3 border-white"
        />

        <h6 className="mt-3 mb-0">Administrator</h6>

        <small>Online</small>
      </div>

      {/* MENU */}

      <div className="px-3">
        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className={`d-flex align-items-center gap-3 text-decoration-none mb-2 p-3 ${
              location.pathname === menu.path
                ? "bg-white text-dark"
                : "text-white"
            }`}
            style={{
              borderRadius: "14px",
              transition: "0.3s",
              fontWeight: "600",
            }}
          >
            <span
              style={{
                fontSize: "22px",
              }}
            >
              {menu.icon}
            </span>

            {menu.name}
          </Link>
        ))}
      </div>

      {/* FOOTER */}

      <div
        className="position-absolute bottom-0 start-0 w-100 p-4"
        style={{
          opacity: 0.8,
        }}
      >
        <small>© 2026 MySalonGweh</small>
      </div>
    </div>
  );
}
