import { headers } from "next/headers";

export const SITE_NAME = "Refactor My Restaurant App";
export const DEFAULT_OG = "/gambar_statis.jpg";

export async function buildMetadata({
  title,
  description,
  url,
  image,
  robots = { index: true, follow: true },
}: {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  robots?: { index: boolean; follow: boolean };
}) {
  const baseTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;

  const h        = await headers();
  const host     = h.get("host") ?? "localhost:3000";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const urlSet   = `${protocol}://${host}/${url}`;

  return {
    title: baseTitle,
    description: description ?? "Cari restoran terbaik di kotamu",
    openGraph: {
      title: baseTitle,
      description: description ?? "",
      url: urlSet,
      images: [{ url: image ?? DEFAULT_OG }],
    },
    alternates: { canonical: urlSet },
    robots,
  };
}
