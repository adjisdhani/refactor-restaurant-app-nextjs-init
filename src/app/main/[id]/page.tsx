import MainDetail from "@/components/main/MainDetail";
import { buildMetadata } from "@/libs/metadata";
import { cookies } from "next/headers";
import { getDataUserByToken } from "@/libs/api";

interface MetadataProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(props: MetadataProps) {
  const params = await props.params;
  const url = `main/${params.id}`;
  const cookieStore  = await cookies();
  const sessionToken = cookieStore.get("token")?.value;
  const user = sessionToken ? await getDataUserByToken(Number(sessionToken)) : null;

  if (user) {
    return await buildMetadata({
      title: `${user.username}'s Dashboard`,
      description: `Halo ${user.username}, restaurant dengan id = ${params.id}.`,
      url: url,
    });
  }

  return await buildMetadata({
    title: "Beranda",
    description: "Temukan restoran terbaik dekat kamu.",
    url: url,
  });
}

export default function Page() {
  return (
    <MainDetail />
  );
}