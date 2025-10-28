"use client";
import Link from "next/link";
import Image from "next/image";
import type {
    RestaurantCardProps
} from "@/types/main";

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
      <div className="bg-gray-200 h-40 w-full flex items-center justify-center text-gray-400 text-sm">
        {restaurant.photos ? (
          <Image
              src={restaurant.photos}
              alt={restaurant.name}
              width={800}      
              height={500}     
              className="rounded-2xl shadow-lg object-cover w-full h-full"
          />
        ) : (
          "No Image"
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-base font-semibold text-gray-800 truncate">
              {restaurant.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <span>⭐ {restaurant.rating}</span>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            🍽️ {restaurant.categories || "Uncategorized"}
          </p>
          <div className="text-sm">
            {restaurant.is_open ? (
              <span className="text-green-600 font-medium">● OPEN NOW</span>
            ) : (
              <span className="text-red-600 font-medium">● CLOSED</span>
            )}
          </div>
        </div>

        <Link
          href={`/main/${restaurant.id}`}
          className="mt-4 bg-blue-900 text-white text-sm py-2 rounded text-center hover:bg-blue-800 transition"
        >
          LEARN MORE
        </Link>
      </div>
    </div>
  );
}
