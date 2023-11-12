import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrders() {
  const [orderData, setOrderData] = useState("");

  const fetchMyOrders = async () => {
    const response = await fetch("http://localhost:5000/api/myorders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: localStorage.getItem("userEmail"),
      }),
    });

    const json = await response.json();

    if (response.status === 200) {
      setOrderData(json);
    } else {
      setOrderData("");
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>
        
      <div>
        <Footer />
      </div>
    </div>
  );
}
