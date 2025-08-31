import React, { useState } from "react";

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
  createdAt: string;
  description: string;
};

interface BookingsTabsProps {
  bookings: Bking[];
  onAccept?: (id: string, price: string, booking: Bking) => void;
  onReject?: (id: string, price: string, booking: Bking) => void;
  onComplete?: (id: string, booking: Bking) => void;
}

const TABS = [
  { label: "Requested", value: "Requested" },
  { label: "Accepted", value: "Accepted" },
  { label: "Completed", value: "Completed" },
];

const BookingsTabs: React.FC<BookingsTabsProps> = ({
  bookings,
  onAccept,
  onReject,
  onComplete,
}) => {
  const [selectedTab, setSelectedTab] = useState("Requested");

  const filtered = bookings.filter((b) => b.status === selectedTab);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            className={`px-4 py-2 rounded ${
              selectedTab === tab.value
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-gray-500">No bookings found.</div>
      )}
      {filtered.map((bking) => (
        <BookingCard
          key={bking.id}
          bking={bking}
          onAccept={onAccept}
          onReject={onReject}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
};

interface BookingCardProps {
  bking: Bking;
  onAccept?: (id: string, price: string, booking: Bking) => void;
  onReject?: (id: string, price: string, booking: Bking) => void;
  onComplete?: (id: string, booking: Bking) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  bking,
  onAccept,
  onReject,
  onComplete,
}) => {
  const [inputPrice, setInputPrice] = useState(bking.price || "");

  return (
    <div className="border rounded p-4 mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
      {/* Left: Booking details */}
      <div className="flex-1">
        <div className="font-semibold">{bking.name}</div>
        <div className="text-gray-500">{bking.typeOfService}</div>
        <div className="text-xs text-gray-400">{bking.date}</div>
        <div className="text-xs text-gray-400">{bking.description}</div>
      </div>
      {/* Right: Price and Actions */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 mt-4 md:mt-0 md:ml-8">
        <div className="flex flex-col items-end">
          <span className="font-bold text-lg">
            {bking.price && bking.price !== "--" ? `$${bking.price}` : ""}
          </span>
        </div>
        {bking.status === "Requested" && (
          <div className="flex flex-row items-center gap-2">
            <input
              type="text"
              className="border rounded px-2 py-1 w-24"
              placeholder="Enter price"
              value={inputPrice}
              onChange={(e) => setInputPrice(e.target.value)}
            />
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => onAccept && onAccept(bking.id, inputPrice, bking)}
            >
              Accept
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => onReject && onReject(bking.id, inputPrice, bking)}
            >
              Reject
            </button>
          </div>
        )}
        {bking.status === "Accepted" && (
          <button
            className="bg-yellow-600 text-white px-4 py-2 rounded"
            onClick={() => onComplete && onComplete(bking.id, bking)}
          >
            Complete
          </button>
        )}
        {bking.status === "Completed" && (
          <span className="text-green-700 font-bold">Completed</span>
        )}
      </div>
    </div>
  );
};

export default BookingsTabs;
