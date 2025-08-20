import React from "react";
import BookingForm from "@/modules/booking/ui/booking-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminBookingView from "@/modules/booking/ui/admin-booking-view";
import { Suspense } from "react";

export default async function BookingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("auth/sign-in");
  }
  if (session.user.email == "supriya.pdy@gmail.com") {
    return (
      <Suspense fallback={<div>Loading bookings...</div>}>
        <AdminBookingView />
      </Suspense>
    );
  }
  return <BookingForm />;
}
