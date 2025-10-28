"use client";

import { useCallback, useEffect, useState } from "react";
import MainForm from "@/components/main/MainForm";
import type { 
    Restaurant 
} from "@/types/main";
import { fetchRestaurantsCall } from "@/libs/api";

export default function MainPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filtered, setFiltered] = useState<Restaurant[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  
  const fetchRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      /* let url = "https://68ea518bf1eeb3f856e6e525.mockapi.io/api/v1/restaurants";
      if (selectedCategory && selectedCategory !== "All") {
        url += `?categories=${selectedCategory}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch restaurants");

      const data: unknown = await res.json();
      if (!Array.isArray(data)) throw new Error("Invalid data format"); */

      const data = await fetchRestaurantsCall(selectedCategory);

      const formattedData: Restaurant[] = data
        .map((item) => {
          if (
            typeof item === "object" &&
            item !== null &&
            "id" in item &&
            "name" in item &&
            "categories" in item &&
            "photos" in item &&
            "rating" in item &&
            "price_range" in item &&
            "is_open" in item &&
            "address" in item &&
            "reviews" in item
          ) {
            return {
              id: String(item.id),
              name: String(item.name),
              categories: String(item.categories),
              photos: String(item.photos),
              rating: Number(item.rating),
              price_range: Number(item.price_range),
              is_open: Boolean(item.is_open),
              address: String(item.address),
              reviews: !Array.isArray(item.reviews) ? String(item.reviews) : item.reviews,
            };
          }
          return null;
        })
        .filter((r): r is Restaurant => r !== null);

      setRestaurants(formattedData);
      setFiltered(formattedData);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);


  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  useEffect(() => {
    let filteredList = [...restaurants];

    if (showOpenOnly) {
      filteredList = filteredList.filter((r) => r.is_open);
    }

    if (selectedPrice) {
      const [min, max] = selectedPrice.split("-").map(Number);
      filteredList = filteredList.filter(
        (r) => r.price_range >= min && r.price_range <= max
      );
    }

    setFiltered(filteredList);
  }, [showOpenOnly, selectedPrice, restaurants]);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 4);

  const handleClear = () => {
    setShowOpenOnly(false);
    setSelectedPrice("");
    setSelectedCategory("");
  };

  return (
    <MainForm
      loading={loading}
      filtered={filtered}
      visibleCount={visibleCount}
      showOpenOnly={showOpenOnly}
      selectedPrice={selectedPrice}
      selectedCategory={selectedCategory}
      setShowOpenOnly={setShowOpenOnly}
      setSelectedPrice={setSelectedPrice}
      setSelectedCategory={setSelectedCategory}
      handleClear={handleClear}
      handleLoadMore={handleLoadMore}
    />
  );
}
