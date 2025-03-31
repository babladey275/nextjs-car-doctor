"use client";

import MyBookingTable from "@/components/tables/MyBookingTable";
import React, { useEffect, useState } from "react";

export default function MyBookingsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMyBooking = async () => {
      const res = await fetch("http://localhost:3000/api/service");
      const d = await res.json();
      setData(d);
    };

    fetchMyBooking();
  }, []);
  return (
    <div>
      <MyBookingTable data={data} />
    </div>
  );
}
