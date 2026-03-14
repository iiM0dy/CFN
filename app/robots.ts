import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/', '/checkout/', '/dashboard/'],
        },
        sitemap: 'https://www.cfnboost.com/sitemap.xml',
    }
}
