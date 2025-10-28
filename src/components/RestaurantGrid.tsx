"use client";
import RestaurantCard from "./RestaurantCard";
import type {
    RestaurantGridProps 
} from "@/types/main";

export default function RestaurantGrid({
  restaurants,
  visibleCount,
  handleLoadMore,
}: RestaurantGridProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restaurants.slice(0, visibleCount).map((r) => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </div>

      {visibleCount < restaurants.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="border border-gray-400 text-gray-700 px-6 py-2 rounded hover:bg-gray-100 transition"
          >
            LOAD MORE
          </button>
        </div>
      )}
    </>
  );
}
