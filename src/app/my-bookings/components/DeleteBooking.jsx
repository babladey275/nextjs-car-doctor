"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

export default function DeleteBooking({ id }) {
  const router = useRouter();
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/service/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (res.ok) {
          Swal.fire({
            title: "Deleted!",
            text: "Your booking has been deleted.",
            icon: "success",
          });
          router.refresh();
        } else {
          toast.error(data?.message || "Failed to delete booking");
        }
      } catch (error) {
        toast.error("An unexpected error occurred.");
      }
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
