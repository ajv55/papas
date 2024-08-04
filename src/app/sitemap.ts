import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://www.papasllenos.com/',
            lastModified: new Date(),
        }
    ]
}