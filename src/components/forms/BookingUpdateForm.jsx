"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight,
  FaDollarSign,
} from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";

export default function BookingUpdateForm({ data }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBookService = async (e) => {
    toast("Updating Booking...", { id: "submitting" });
    e.preventDefault();

    const form = e.target;
    const date = form.date.value;
    const phone = form.phone.value;
    const address = form.address.value;

    const bookingPayload = {
      date,
      phone,
      address,
    };

    setLoading(true);

    const res = await fetch(
      `http://localhost:3000/api/my-bookings/${data._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(bookingPayload),
      }
    );
    const postedResponse = await res.json();

    console.log("hello bro", postedResponse);

    if (postedResponse.modifiedCount) {
      toast.success("Booking Update Successful!", { id: "submitting" });
      setLoading(false);
      router.push("/my-bookings");
    } else {
      toast.error("Booking Update failed. Please try again.", {
        id: "submitting",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Form Header */}
          <div className="bg-[#FF3811] py-8 px-6 text-center space-y-1">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Update Your Booking
            </h2>
            <p className="text-white/95 font-medium">{data?.service_name}</p>
          </div>

          {/* Service Summary */}
          <div className="p-6 bg-white border-b border-gray-200/70">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden border-2 border-[#FF3811]/10 shadow-sm">
                <img
                  className="h-full w-full object-cover"
                  src={data?.service_img}
                  alt={data?.service_name}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {data?.service_name}
                </h3>
                <div className="mt-1.5 flex items-baseline">
                  <FaDollarSign className="text-[#FF3811] mr-1 h-3.5 w-3.5" />
                  <span className="text-2xl font-bold text-[#FF3811]">
                    {data?.service_price}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 font-medium">
                    Total
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleBookService} className="p-6 sm:p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      name="name"
                      type="text"
                      defaultValue={session?.user?.name}
                      readOnly
                      className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-[#FF3811] focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      name="email"
                      type="email"
                      defaultValue={session?.user?.email}
                      readOnly
                      className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-[#FF3811] focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Date Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Date
                  </label>
                  <div className="relative">
                    <input
                      defaultValue={data?.date}
                      required
                      name="date"
                      type="date"
                      className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#FF3811] focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      defaultValue={data?.phone}
                      required
                      name="phone"
                      type="tel"
                      placeholder="Your Phone Number"
                      className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#FF3811] focus:border-transparent placeholder-gray-400"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Address Field */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <div className="relative">
                    <input
                      defaultValue={data?.address}
                      required
                      name="address"
                      type="text"
                      placeholder="Your Location"
                      className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#FF3811] focus:border-transparent placeholder-gray-400"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200/60" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white text-sm text-gray-500 font-medium">
                    Payment Details
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                disabled={loading}
                type="submit"
                className="w-full flex justify-center items-center gap-2 px-6 py-4 rounded-xl text-lg font-semibold text-white bg-[#FF3811] hover:bg-[#d42e0d] hover:shadow-lg cursor-pointer"
              >
                {loading ? (
                  <ImSpinner9 className="animate-spin m-auto" />
                ) : (
                  <>
                    Update Booking
                    <FaArrowRight className="w-4 h-4 mt-0.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
