"use client";

import type {
    FilterBarProps 
} from "@/types/main";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/utils/logout";
import { getCsrfTokenFromCookie } from "@/utils/csrf";

export default function FilterBar({
  showOpenOnly,
  selectedPrice,
  selectedCategory,
  setShowOpenOnly,
  setSelectedPrice,
  setSelectedCategory,
  handleClear,
}: FilterBarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Yakin mau logout?");

    if (!confirmLogout) return;
    
    /* await logoutAction();

    router.push("/login"); */

    const csrf = getCsrfTokenFromCookie() ?? '';

    const res = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrf,
      },
      credentials: 'include',
    });

    if (!res.ok) {
      const text = await res.text();
      alert('Logout gagal: ' + text);
      return;
    }

    router.push('/login');
  };
  
  return (
    <div className="flex flex-wrap gap-4 mb-10 items-center">
      <span className="text-sm text-gray-700 font-medium">Filter By:</span>

      <button
        onClick={() => setShowOpenOnly(!showOpenOnly)}
        className={`px-4 py-2 border rounded ${
          showOpenOnly
            ? "bg-green-100 border-green-400 text-green-700"
            : "border-gray-300 hover:bg-gray-100"
        }`}
      >
        {showOpenOnly ? "Open Only ✅" : "Open Now"}
      </button>

      <select
        className="px-4 py-2 border border-gray-300 rounded text-gray-700"
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
      >
        <option value="">All Prices</option>
        <option value="50-100">50 - 100</option>
        <option value="100-200">100 - 200</option>
        <option value="500-1000">500 - 1000</option>
      </select>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded text-gray-700"
      >
        <option value="">All Categories</option>
        <option value="Indonesian">Indonesian</option>
        <option value="Seafood">Seafood</option>
        <option value="Italian">Italian</option>
        <option value="Thai">Thai</option>
        <option value="Japanese">Japanese</option>
      </select>

      <button
        onClick={handleClear}
        className="ml-2 text-gray-500 text-sm hover:underline"
      >
        Clear All
      </button>
      <button
        onClick={handleLogout}
        className={`px-4 py-2 border rounded`}
      >
        {"Logout"}
      </button>
    </div>
  );
}
