"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

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
};

interface Props {
  bking: Bking;
  id: string;
  type: "completed" | "pending" | "request";
  name: string;
  service: string;
  date: string;
  price?: string;
  onAccept: (id: string, price: string, booking: Bking) => void;
  onReject: (id: string, price: string, booking: Bking) => void;
  onComplete: (id: string, booking: Bking) => void;
}

export default function BookCard({
  bking,
  id,
  type,
  name,
  service,
  date,
  price,
  onAccept,
  onReject,
  onComplete,
}: Props) {
  const [inputprice, setInputrice] = useState("--");
  return (
    <Card className="w-full flex flex-row p-4 mb-4 shadow-md items-center">
      {/* Left section */}
      <div className="flex flex-col flex-1 items-start">
        <span className="font-semibold text-lg">{name}</span>
        <span className="text-gray-600">{service}</span>
        <span className="text-gray-400 text-sm">{date}</span>
      </div>
      {/* Middle section: Price */}
      {price && (
        <div className="flex flex-col items-center mx-8">
          <span className="font-medium text-base text-gray-700">Price</span>
          <span className="text-lg text-green-700 font-bold">{price}</span>
        </div>
      )}
      {/* Right section: Buttons/Inputs */}
      <div className="flex gap-2 items-center">
        {type === "request" && (
          <>
            {!price && (
              <>
                <span className="mr-2 font-medium">Price</span>
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-24 mr-2"
                  placeholder="Enter price"
                  onChange={(e) => setInputrice(e.target.value)}
                />
              </>
            )}
            <Button
              variant="outline"
              className="border-green-600 text-green-700 hover:bg-green-50"
              onClick={() => onAccept(id, inputprice, bking)}
            >
              Accept
            </Button>
            <Button
              variant="outline"
              className="border-red-600 text-red-700 hover:bg-red-50 mr-2 ml-2"
              onClick={() => onReject(id, inputprice, bking)}
            >
              Reject
            </Button>
          </>
        )}
        {type === "pending" && (
          <Button
            variant="outline"
            className="border-yellow-600 text-yellow-700 hover:bg-yellow-50"
            onClick={() => onComplete(id, bking)}
          >
            Completed
          </Button>
        )}
        {/* No buttons for completed */}
      </div>
    </Card>
  );
}
