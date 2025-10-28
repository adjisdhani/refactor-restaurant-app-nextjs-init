'use client';

import React from 'react';
import { useState, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/login/AuthForm";
import Loading from "@/components/Loading";
import { getCsrfTokenFromCookie } from "@/utils/csrf";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
//   const [dynamicMessage, setDynamicMessage]  = useState("Berhasil Login");
  const dynamicMessage  = useRef<string>("Loading...");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const uname = username?.trim();
    const pwd = password ?? "";

    if (!uname || uname.length < 3) {
      setError("Username minimal 3 karakter");
      return;
    }
    if (!pwd || pwd.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    try {
      setLoading(true);
      
      /* const users = await getDataUser();
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        document.cookie = `token=${user.id}; path=/; max-age=3600`;
        router.push("/main");
      } else {
        setError("Username atau password salah");
      } */

      const csrf = getCsrfTokenFromCookie() ?? "";

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrf,
        },
        credentials: "include",
        body: JSON.stringify({ username: uname, password: pwd }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "Login gagal");
        setError(text);
        setLoading(false);
        return;
      }

      router.push("/main");
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      onSubmit={handleSubmit}
      error={error}
      loading={loading}
      LoadingComponent={Loading}
      dynamicMessage={dynamicMessage.current}
    />
  );
}