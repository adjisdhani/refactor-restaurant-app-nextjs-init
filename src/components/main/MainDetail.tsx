"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RestaurantHeader from "@/components/RestaurantHeader";
import RestaurantInfo from "@/components/RestaurantInfo";
import ReviewList from "@/components/ReviewList";
import BackButton from "@/components/BackButton";
import LoadingRestaurantDetail from "@/components/LoadingRestaurantDetail";
import type { 
    Review 
} from "@/types/main";
import { fetchRestaurantsDetail } from "@/libs/api";

interface Restaurant {
  id: string;
  name: string;
  categories: string;
  photos: string;
  rating: number;
  price_range: number;
  is_open: boolean;
  address: string;
  reviews: Review[];
}

export default function MainDetail() {
  const params = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    /* async function fetchData() {
      const res = await fetch(
        `https://68ea518bf1eeb3f856e6e525.mockapi.io/api/v1/restaurants/${params.id}`
      );
      if (res.ok) {
        const data = await res.json();
        setRestaurant(data);
      }
    }
    fetchData(); */

    fetchRestaurantsDetail(Number(params.id))
    .then((data) => {
      if (data) {
        setRestaurant(data);
      } else {
        console.error("Data is empty");
      }
    })
    .catch(console.error);
  }, [params.id]);

  if (!restaurant)
    return (
      <LoadingRestaurantDetail/>
    );

  return (
    <div className="max-w-5xl mx-auto p-5 sm:p-8">
      <RestaurantHeader
        name={restaurant.name}
        categories={restaurant.categories}
        photos={restaurant.photos}
        is_open={restaurant.is_open}
        rating={restaurant.rating}
      />

      <RestaurantInfo address={restaurant.address} price_range={restaurant.price_range} />

      <div className="mt-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          Customer Reviews
        </h2>
        <ReviewList reviews={restaurant.reviews} />
      </div>

      <BackButton />
    </div>
  );
}
