"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function HomeView() {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const [home, setHome] = useState(1);
  const [about, setAbout] = useState(0);
  const [book, setBook] = useState(0);
  const sample = 1;
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-0 fixed top-0 left-0 w-full h-10 bg-white z-50 shadow">
        <div className="flex">
          <Link
            className={cn(
              "text-2xl font-semibold px-4 rounded-[7px]",
              home === 1 && "bg-[#eac24b]"
            )}
            href="/"
            onClick={() => {
              setHome(1);
              setBook(0);
              setAbout(0);
            }}
          >
            Home
          </Link>
          <Link
            className={cn(
              "text-2xl font-semibold px-4 rounded-[7px]",
              about === 1 && "bg-[#eac24b]"
            )}
            href="/about"
            onClick={() => {
              setHome(0);
              setBook(0);
              setAbout(1);
            }}
          >
            About
          </Link>
          <Link
            className={cn(
              "text-2xl font-semibold px-4 rounded-[7px]",
              book === 1 && "bg-[#eac24b]"
            )}
            href="/booking"
            onClick={() => {
              setHome(0);
              setBook(1);
              setAbout(0);
            }}
          >
            Booking
          </Link>
        </div>
        <div className="flex items-center">
          <p className="font-semibold text-2xl px-4">{data?.user.name}</p>
          <Button
            onClick={() => {
              authClient.signOut({
                fetchOptions: { onSuccess: () => router.push("/auth/sign-in") },
              });
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
