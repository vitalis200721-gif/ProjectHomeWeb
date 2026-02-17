import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://atriumstudio.com";

  const routes = [
    "",
    "/pricing",
    "/projects",
    "/gallery",
    "/services",
    "/finder",
    "/contact",
    "/auth/sign-in",
    "/auth/sign-up",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
