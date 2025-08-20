"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function BookingSuccessPage() {
  const router = useRouter();

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#eac24b] via-[#D4AF37] to-[#57250b] flex flex-col items-center justify-center px-4">
      {/* Logo & Title */}
      <Image
        src="/sslogo.png"
        alt="Company Logo"
        width={100}
        height={100}
        className="rounded-full"
      />
      <h1 className="mt-2 text-5xl text-white font-semibold text-center pauline">
        Story Of Tassels
      </h1>

      <br />
      <br />
      <br />

      {/* Success Card */}
      <Card className="w-full max-w-lg bg-green-600/90 backdrop-blur-md border-green-300/30 text-white shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold">
            🎉 Booking Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-lg">Thank you for choosing us.</p>
          <p className="text-md opacity-90">
            We will notify you once your booking is accepted.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="mt-6 w-full rounded-xl bg-white text-green-700 font-semibold shadow hover:scale-105 transition"
          >
            Go Back Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
