"use client";

import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export default function Review() {
  const trpc = useTRPC();
  type reviews = { id: string; name: string; stars: number; review: string };
  const { data: reviews } = useSuspenseQuery(
    trpc.reviews.getMany.queryOptions()
  );
  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-4xl text-white text-center">Customer Reviews</h1>
      <hr className="w-48 border-t-2 border-white mt-2" />

      {/* Render reviews */}
      {reviews.length === 0 ? (
        <p className="text-white mt-6">No reviews yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full max-w-3xl">
          {reviews.map(({ id, name, stars, review }) => (
            <div
              key={id}
              className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 flex flex-col items-start 
              transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="font-bold text-[#57250b] text-lg">{name}</span>
              <div className="flex items-center my-1 group">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 transition-colors duration-300 ${
                      i < Number(stars)
                        ? "text-yellow-500 group-hover:text-yellow-200"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-800 mt-2">{review}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
