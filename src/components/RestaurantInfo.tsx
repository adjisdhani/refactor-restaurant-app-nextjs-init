"use client";

import type { 
    RestaurantInfoProps 
} from "@/types/main";

export default function RestaurantInfo({ address, price_range }: RestaurantInfoProps) {
  return (
    <div className="mt-6 bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-100">
      <h3 className="text-gray-800 font-semibold text-base sm:text-lg mb-1">📍 Address</h3>
      <p className="text-gray-600 text-sm sm:text-base">{address}</p>

      <p className="mt-2 text-gray-700">
        💰 <span className="font-medium">Price Range:</span> ${price_range}
      </p>
    </div>
  );
}
