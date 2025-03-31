"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

export default function DeleteBooking({ id }) {
  const router = useRouter();
  const handleDelete = async () => {
    const res = await fetch(`http://localhost:3000/api/service/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (res.ok) {
      toast.success("Booking deleted successfully!");
      router.refresh();
    } else {
      toast.error(data?.message || "Failed to delete booking");
    }
  };
  return (
    <>
      <MdDelete
        className="h-4 w-4 sm:h-5 sm:w-5 cursor-pointer"
        onClick={() => handleDelete(id)}
      />
    </>
  );
}
