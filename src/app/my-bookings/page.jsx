import MyBookingTable from "@/components/tables/MyBookingTable";
import { headers } from "next/headers";

const fetchMyBooking = async () => {
  const res = await fetch("http://localhost:3000/api/service", {
    headers: headers(),
  });
  const d = await res.json();

  return d;
};

export default async function MyBookingsPage() {
  const data = await fetchMyBooking();
  return (
    <div>
      <MyBookingTable data={data} />
    </div>
  );
}
