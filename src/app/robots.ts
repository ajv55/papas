import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/orders'
        },
        sitemap: 'https://www.papasllenos.com/'
    }
}