"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MainContent from "./page-content";
import { useState } from "react";

export default function HomeView() {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const [home, setHome] = useState(1);
  const [about, setAbout] = useState(0);
  const [book, setBook] = useState(0);
  const sample = 1;
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex gap-4">
          <Link className="text-2xl font-semibold" href="/">
            Home
          </Link>
          <Link className="text-2xl font-semibold" href="/about">
            About
          </Link>
          <Link className="text-2xl font-semibold" href="/booking">
            Booking
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-semibold text-2xl">{data?.user.name}</p>
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
      <MainContent />
    </div>
  );
}
