"use client";

import React, { useState } from "react";
import { useTRPC } from "@/trpc/client";
import BookCard from "./book-card";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function AdminBookingView() {
  const trpc = useTRPC();
  const { data, isLoading, error } = useSuspenseQuery(
    trpc.bookings.getMany.queryOptions()
  );
  type bookType = typeof data;
  const completed_data: bookType = [];
  const request_data: bookType = [];
  const pending_data: bookType = [];
  // const onAccept = async (id: string, price:string)  {

  // }
  data.forEach((d) => {
    if (d.status == "Requested") {
      request_data.push(d);
    } else if (d.status == "Completed") {
      completed_data.push(d);
    } else if (d.status == "Pending") {
      pending_data.push(d);
    }
  });
  const [activeTab, setActiveTab] = useState<
    "Requests" | "Pending" | "Completed"
  >("Requests");

  if (isLoading) return <div className="p-6">Loading bookings...</div>;
  if (error)
    return <div className="p-6 text-red-600">Error loading bookings.</div>;

  return (
    <div className="flex flex-col">
      {/* Navigation Bar */}
      <div className="flex w-full bg-gray-100 shadow-md">
        {["Requests", "Pending", "Completed"].map((tab) => (
          <div
            key={tab}
            className={`flex-1 text-center py-4 cursor-pointer font-semibold transition-colors ${
              activeTab === tab
                ? "bg-white border-b-2 border-yellow-600 text-yellow-700"
                : "text-gray-500 hover:text-yellow-700"
            }`}
            onClick={() => setActiveTab(tab as typeof activeTab)}
          >
            {tab}
          </div>
        ))}
      </div>
      {/* Content for the selected tab */}
      <div className="p-6">
        {activeTab === "Requests" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Requests</h2>
            {request_data?.length === 0 && <p>No requests.</p>}
            {request_data?.map((booking) => (
              <BookCard
                key={booking.name}
                type="request"
                name={booking.name}
                service={booking.typeOfService}
                date={booking.date}
                // onAccept, onReject handlers here
              />
            ))}
          </div>
        )}
        {activeTab === "Pending" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Pending</h2>
            {pending_data?.length === 0 && <p>No pending bookings.</p>}
            {pending_data?.map((booking) => (
              <BookCard
                key={booking.name}
                type="pending"
                name={booking.name}
                service={booking.typeOfService}
                date={booking.date}
                // onComplete handler here
              />
            ))}
          </div>
        )}
        {activeTab === "Completed" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Completed</h2>
            {completed_data?.length === 0 && <p>No completed bookings.</p>}
            {completed_data?.map((booking) => (
              <BookCard
                key={booking.name}
                type="completed"
                name={booking.name}
                service={booking.typeOfService}
                date={booking.date}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
