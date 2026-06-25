import { useEffect, useState } from "react";
import api from "../api/axios";

function Payment() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getPayments();
  }, []);

  const getPayments = async () => {
    try {
      const response = await api.get("/payments");

      setPayments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "#22c55e";

      case "pending":
        return "#f59e0b";

      case "failed":
        return "#ef4444";

      default:
        return "#6b7280";
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>💳 Data Pembayaran</h1>

        {payments.length === 0 ? (
          <div className="empty-card">Belum ada data pembayaran</div>
        ) : (
          payments.map((payment) => (
            <div key={payment.id} className="payment-card">
              <h3>Payment #{payment.id}</h3>

              <p>
                <strong>Booking ID :</strong> {payment.booking_id}
              </p>

              <p>
                <strong>Total :</strong> Rp{" "}
                {Number(payment.amount).toLocaleString("id-ID")}
              </p>

              <p>
                <strong>Transaction :</strong> {payment.transaction_id}
              </p>

              <span
                style={{
                  background: getStatusColor(payment.payment_status),
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  display: "inline-block",
                  marginTop: "10px",
                }}
              >
                {payment.payment_status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Payment;
