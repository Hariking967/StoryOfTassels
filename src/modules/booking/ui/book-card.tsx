import React from "react";

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
  createdAt: string; // Added createdAt
};

interface Props {
  id: string;
  bking: Bking;
  type: string;
  name: string;
  service: string;
  date: string;
  price: string;
  onAccept?: (id: string, price: string, booking: Bking) => void;
  onReject?: (id: string, price: string, booking: Bking) => void;
  onComplete?: (id: string, booking: Bking) => void;
}

const BookCard: React.FC<Props> = ({
  id,
  bking,
  type,
  name,
  service,
  date,
  price,
  onAccept,
  onReject,
  onComplete,
}) => {
  return (
    <div className="border p-4 rounded-lg shadow mb-4">
      <h3 className="text-lg font-bold">{name}</h3>
      <p>Service: {service}</p>
      <p>Date: {date}</p>
      <p>Price: {price}</p>

      {type === "request" && (
        <div className="flex gap-2 mt-2">
          <button
            className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={() => onAccept?.(id, price, bking)}
          >
            Accept
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => onReject?.(id, price, bking)}
          >
            Reject
          </button>
        </div>
      )}

      {type === "accepted" && (
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
          onClick={() => onComplete?.(id, bking)}
        >
          Complete
        </button>
      )}
    </div>
  );
};

export default BookCard;
