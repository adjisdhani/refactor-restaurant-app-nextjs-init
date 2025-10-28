import type { 
    Restaurant,
    Review
} from "@/types/main";
import type { User } from "@/types/login";
import { getCsrfTokenFromCookie } from "@/utils/csrf";

interface RestaurantDetail {
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

export async function fetchRestaurantsCall(selectedCategory?: string): Promise<Restaurant[]> {
  let url = `${process.env.NEXT_PUBLIC_API_RESTAURANT}`;
  
  if (selectedCategory && selectedCategory !== "All") {
    url += `?categories=${selectedCategory}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch restaurants");

  const data: unknown = await res.json();
  if (!Array.isArray(data)) throw new Error("Invalid data format");

  return data;
}

export async function fetchRestaurantsDetail(idTarget: number = 0): Promise<RestaurantDetail> {
  const url = `${process.env.NEXT_PUBLIC_API_RESTAURANT}/${idTarget}`;

  const csrf = getCsrfTokenFromCookie() ?? "";
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrf,
    }
  });

  // const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch restaurants detail");

  return await res.json();
}

export async function getDataUserServer(): Promise<User[]> {
  const url = `${process.env.NEXT_PUBLIC_API_USER}`;
  const res = await fetch(url, { method: "GET", cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch user: ${res.status}`);
  return res.json();
}

export async function getDataUser(): Promise<User[]> {
  const url = `${process.env.NEXT_PUBLIC_API_USER}`;
  
  const csrf = getCsrfTokenFromCookie() ?? "";
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrf,
    }
  });

  // const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch user");

  return await res.json();
}

export async function getDataUserByToken(token : number | null): Promise<User | undefined> {
  if (!token) {
    return undefined;
  }

  const users = await getDataUserServer();
  const user = users.find(
      (u) => Number(u.id) === token
  );

  return user;
}