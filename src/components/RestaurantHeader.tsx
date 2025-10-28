"use client";

import Image from "next/image";
import type { 
    RestaurantHeaderProps 
} from "@/types/main";

export default function RestaurantHeader({
  name,
  categories,
  photos,
  is_open,
  rating,
}: RestaurantHeaderProps) {
  return (
    <div className="relative">
      <Image
          src={photos}      
          alt={name}        
          width={800}        
          height={600}       
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl shadow-lg"
        />
      <span
        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
          is_open ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {is_open ? "Open Now" : "Closed"}
      </span>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{name}</h1>
          <p className="text-gray-500 text-sm sm:text-base">{categories}</p>
        </div>
        <div className="flex items-center gap-2 text-yellow-500 font-semibold text-lg">
          ⭐ {rating}
        </div>
      </div>
    </div>
  );
}
