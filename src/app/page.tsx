import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token");

  if (token) {
  
    redirect("/main");
  } else {
  
    redirect("/login");
  }
}
