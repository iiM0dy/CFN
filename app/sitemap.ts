import { MetadataRoute } from 'next'

const STATIC_PAGES = [
    '',
    '/blog',
    '/about-us',
    '/cashback',
    '/become-pro',
    '/contact',
    '/legit',
    '/faq',
    '/wall-of-fame',
    '/services'
]

const BLOG_SLUGS = [
    'modern-workshop-leveling-guide',
    'low-latency-competitive-edge',
    'perfect-team-dynamic-guide',
    'season-4-meta-shifts',
    'securing-digital-assets-checklist',
    'throne-and-liberty-progression'
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.cfnboost.com'

    const staticSitemap = STATIC_PAGES.map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    const blogSitemap = BLOG_SLUGS.map(slug => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [...staticSitemap, ...blogSitemap]
}
