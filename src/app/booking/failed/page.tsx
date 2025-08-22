"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HomeView from "@/modules/home/ui/views/home-view";

export default function BookingFailedPage() {
  const router = useRouter();

  return (
    <>
      <HomeView />
      <div className="h-screen w-full bg-gradient-to-br from-[#eac24b] via-[#D4AF37] to-[#57250b] flex flex-col items-center justify-center px-4">
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
        <Card className="w-full max-w-lg bg-red-600/90 backdrop-blur-md border-red-300/30 text-white shadow-2xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold">
              ❌ Booking Failed
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg">Something went wrong with your booking.</p>
            <p className="text-md opacity-90">
              Please try again and make sure all details are correct.
            </p>
            <Button
              onClick={() => router.push("/booking")}
              className="mt-6 w-full rounded-xl bg-white text-red-700 font-semibold shadow hover:scale-105 transition"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
