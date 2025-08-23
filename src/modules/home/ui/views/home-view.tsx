"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

export default function HomeView() {
  const router = useRouter();
  const pathname = usePathname(); // 👈 current route
  const { data } = authClient.useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between px-2 md:px-4 py-0 fixed top-0 left-0 w-full h-14 bg-white z-50 shadow">
        {/* Nav Links */}
        <div className="flex gap-1 md:gap-3">
          <Link
            href="/"
            className={cn(
              "text-base md:text-lg font-bold px-3 md:px-5 py-2 rounded-[10px] transition-colors duration-200 hover:bg-[#ffe9a7] hover:text-[#bfa12e]",
              pathname === "/" && "bg-[#eac24b] text-white shadow"
            )}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={cn(
              "text-base md:text-lg font-bold px-3 md:px-5 py-2 rounded-[10px] transition-colors duration-200 hover:bg-[#ffe9a7] hover:text-[#bfa12e]",
              pathname === "/about" && "bg-[#eac24b] text-white shadow"
            )}
          >
            About
          </Link>
          <Link
            href="/booking"
            className={cn(
              "text-base md:text-lg font-bold px-3 md:px-5 py-2 rounded-[10px] transition-colors duration-200 hover:bg-[#ffe9a7] hover:text-[#bfa12e]",
              pathname === "/booking" && "bg-[#eac24b] text-white shadow"
            )}
          >
            Booking
          </Link>
        </div>

        {/* Username with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 cursor-pointer font-bold text-base md:text-lg px-3 md:px-4 text-[#bfa12e] bg-[#fff8e1] rounded-[8px] py-1 shadow"
            type="button"
          >
            <span>{data?.user.name}</span>
            <ChevronDownIcon />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border p-2">
              <Button
                className="w-full text-left text-red-600 hover:bg-red-100 px-3 py-2 rounded-md"
                onClick={() => {
                  authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => router.push("/auth/sign-in"),
                    },
                  });
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
