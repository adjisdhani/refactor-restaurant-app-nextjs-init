import Login from "@/components/login/Login";
import { buildMetadata } from "@/libs/metadata";

export async function generateMetadata() {
  const url = 'login';

  return await buildMetadata({
    title: "Login",
    description: "Masuk ke akunmu — MyRestaurantApp",
    url,
  });
}

export default function Page() {
  return (
    <Login />
  );
}