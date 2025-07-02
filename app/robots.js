export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: ['/'],
            disallow: '/private/',
        },
        sitemap: 'https://projectseek.hongfoundation.org.tw/sitemap.xml',
    }
}