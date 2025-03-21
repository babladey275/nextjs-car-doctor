import dbConnect from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

export default async function ServicesSection() {
  const data = await dbConnect("services").find({}).toArray();
  return (
    <div className="grid grid-cols-12 gap-6">
      {data.map((item) => {
        return (
          <div
            className="col-span-12 md:col-span-6 lg:col-span-4 shadow p-4 rounded-lg"
            key={item._id}
          >
            <figure className="w-full h-3/4 flex justify-center items-center">
              <Image
                className="w-full h-full object-fit rounded-lg"
                src={item.img}
                alt={item.title}
                width={314}
                height={208}
              />
            </figure>
            <div className="flex justify-between items-center mt-4">
              <div>
                <h2 className="font-bold text-xl">{item.title}</h2>
                <p className="font-bold text-xl text-orange-500">
                  Price : ${item.price}
                </p>
              </div>
              <div>
                <Link
                  href={`/services/${item._id}`}
                  className="text-orange-500"
                >
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
