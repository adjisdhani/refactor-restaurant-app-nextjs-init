import MainPage from "@/components/main/MainPage";
import { buildMetadata } from "@/libs/metadata";

export async function generateMetadata() {
  const url = `main`;

  return await buildMetadata({
    title: `Dashboard`,
    description: `Lihat ringkasan restauran favoritmu.`,
    url: url,
  });
}

export default function Page() {
  return (
    <MainPage />
  );
}