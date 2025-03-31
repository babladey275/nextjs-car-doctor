import DeleteBooking from "@/app/my-bookings/components/DeleteBooking";
import Image from "next/image";
import Link from "next/link";
import {
  FaRegEdit,
  FaCalendarAlt,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaDollarSign,
} from "react-icons/fa";

export default function MyBookingTable({ data }) {
  return (
    <div className="my-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-6 relative pb-4">
        My Bookings
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#FF3811] rounded-full"></span>
      </h1>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 hidden sm:table-header-group">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Service
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date & Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {data?.length > 0 ? (
                data.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-md overflow-hidden border border-gray-200">
                          <Image
                            src={item.service_img}
                            alt={item.service_name}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.service_name}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <FaDollarSign className="mr-1 text-xs" />
                            <span>{item.service_price}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 sm:px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <FaCalendarAlt className="mr-2 text-xs flex-shrink-0" />
                          <span>
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-start text-sm text-gray-500">
                          <FaMapMarkerAlt className="mr-2 mt-0.5 text-xs flex-shrink-0" />
                          <span className="line-clamp-2">{item.address}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <FaPhoneAlt className="mr-2 text-xs" />
                        <span>{item.phone}</span>
                      </div>
                    </td>

                    <td className="flex items-center gap-4 justify-end px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/my-bookings/${item._id}`}
                          className="p-1 sm:p-2 rounded-full hover:bg-indigo-50 transition-colors"
                          title="Edit booking"
                        >
                          <FaRegEdit className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>
                      </div>
                      <div>
                        <DeleteBooking id={item._id} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="text-gray-500 mb-2">
                      You don't have any bookings yet
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
