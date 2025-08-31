"use client";

import React, { useState } from "react";
import { useTRPC } from "@/trpc/client";
import BookingsTabs from "./book-card";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

type Bking = {
  date: string;
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  loggedin_email: string;
  typeOfService: string;
  status: string;
  price: string;
  description: string;
  createdAt: string;
};

export default function AdminBookingView() {
  const { data: session } = authClient.useSession();
  const trpc = useTRPC();
  const { data, isLoading, error } = useSuspenseQuery(
    trpc.bookings.getMany.queryOptions()
  );
  const queryClient = useQueryClient();

  const updatePricing = useMutation(
    trpc.bookings.updatePrice.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.bookings.getMany.queryOptions()
        );
      },
      onError: (err) => {
        console.error("Mutation error:", err);
      },
    })
  );
  const updateStatus = useMutation(
    trpc.bookings.updateStatus.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.bookings.getMany.queryOptions()
        );
      },
      onError: (err) => {
        console.error("Mutation error:", err);
      },
    })
  );

  const onAccept = async (id: string, price: string, booking: Bking) => {
    try {
      const res = await fetch(
        "https://emailbackend-e1gi.onrender.com/send-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: booking.email,
            subject: "Your Order Confirmation",
            body: `
Dear ${booking.email || "Customer"},
We’re happy to let you know that your booking has been **accepted**! 🎉  

**Booking Details:**  
- Service: ${booking.typeOfService}  
- Date: ${booking.date}  
- Price: ${price}  

We look forward to serving you. If you have any questions, feel free to reply to this email.  

Warm regards,  
Team Story of Tassels  
`,
          }),
        }
      );
      if (!res.ok) {
        throw new Error(`Request failed`);
      }
    } catch (err) {
      console.error("Failed to send accept email:", err);
    }
    updatePricing.mutate({ id, price });
    updateStatus.mutate({ id, status: "Accepted" });
  };

  const onReject = async (id: string, price: string, booking: Bking) => {
    try {
      const res = await fetch(
        "https://emailbackend-e1gi.onrender.com/send-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: booking.email,
            subject: "Sorry order failed",
            body: `
Dear ${booking.email || "Customer"},

Unfortunately, we are unable to fulfill your booking at the requested time.  

**Booking Details:**  
- Service: ${booking.typeOfService}  
- Date: ${booking.date}  

We sincerely apologize for the inconvenience. Please feel free to try booking another time—we’d love to serve you then.  

Thank you for your understanding.  

Warm regards,  
Team Story of Tassels  
`,
          }),
        }
      );
      if (!res.ok) {
        throw new Error(`Request failed`);
      }
    } catch (err) {
      console.error("Failed to send reject email:", err);
    }
    updatePricing.mutate({ id, price });
    updateStatus.mutate({ id, status: "Rejected" });
  };

  const onComplete = async (id: string, booking: Bking) => {
    try {
      const res = await fetch(
        "https://emailbackend-e1gi.onrender.com/send-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: booking.email,
            subject: "Your Order Completed",
            body: `
Dear ${booking.email || "Customer"},

We’re delighted to inform you that your booking has been **successfully completed**. 🎉  

**Booking Details:**  
- Service: ${booking.typeOfService}  
- Date: ${booking.date}  

We truly appreciate your trust in us. Kindly take a moment to rate your experience on our website => https://story-of-tassels.vercel.app/booking , it helps us grow and serve you better.  

Looking forward to seeing you again!  

Warm regards,  
Team Story of Tassels  
`,
          }),
        }
      );
      if (!res.ok) {
        throw new Error(`Request failed`);
      }
    } catch (err) {
      console.error("Failed to send completion email:", err);
    }
    updateStatus.mutate({ id, status: "Completed" });
  };

  if (isLoading) return <div className="p-6">Loading bookings...</div>;
  if (error)
    return <div className="p-6 text-red-600">Error loading bookings.</div>;

  return (
    <div className="p-6">
      <BookingsTabs
        bookings={data}
        onAccept={onAccept}
        onReject={onReject}
        onComplete={onComplete}
      />
    </div>
  );
}
