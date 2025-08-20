import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Props {
  type: "completed" | "pending" | "request";
  name: string;
  service: string;
  date: string;
  onAccept?: () => void;
  onReject?: () => void;
  onComplete?: () => void;
}

export default function BookCard({
  type,
  name,
  service,
  date,
  onAccept,
  onReject,
  onComplete,
}: Props) {
  return (
    <Card className="w-full flex flex-row p-4 mb-4 shadow-md items-center">
      <div className="flex flex-col flex-1 items-start">
        <span className="font-semibold text-lg">{name}</span>
        <span className="text-gray-600">{service}</span>
        <span className="text-gray-400 text-sm">{date}</span>
      </div>
      <div className="flex gap-2">
        {type === "request" && (
          <>
            <Button
              variant="outline"
              className="border-green-600 text-green-700 hover:bg-green-50"
              onClick={onAccept}
            >
              Accept
            </Button>
            <Button
              variant="outline"
              className="border-red-600 text-red-700 hover:bg-red-50 mr-2 ml-2"
              onClick={onReject}
            >
              Reject
            </Button>
          </>
        )}
        {type === "pending" && (
          <Button
            variant="outline"
            className="border-yellow-600 text-yellow-700 hover:bg-yellow-50"
            onClick={onComplete}
          >
            Completed
          </Button>
        )}
        {/* No buttons for completed */}
      </div>
    </Card>
  );
}
