"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

interface User {
  id: string;
  username: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(
        "https://68ea518bf1eeb3f856e6e525.mockapi.io/api/v1/users"
      );
      if (!response.ok) throw new Error("Failed to fetch user data");

      const users: User[] = await response.json();
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        setLoading(false);
        document.cookie = `token=${user.id}; path=/; max-age=3600`;
        router.push("/main");
      } else {
        setLoading(false);
        setError("Username atau password salah");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Terjadi kesalahan saat login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fefcfb] px-4">
    
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-[#ffe5d9] to-[#ffdde1] -z-10 rounded-b-3xl"></div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 relative z-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
          >
            Sign In
          </button>
        </form>
        {loading ? (<Loading />) : ''}
      </div>
    </div>
  );
}
