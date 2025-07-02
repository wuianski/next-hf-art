import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import { readItems } from "@directus/sdk";

const EXTERNAL_DATA_URL = 'https://projectseek.hongfoundation.org.tw';

async function getPage() {
    try {
        const page = await directus.request(
            readItems("pages", {
                fields: [
                    "*",
                    "*.*",
                    "*.*.*",
                    "*.*.*.*",
                ],
                filter: {
                    status: { _eq: "published" },
                },
            })
        );
        return page;
    } catch {
        notFound();
    }
}


export default async function sitemap() {
    const page = await getPage();
    // console.log(page);
    if (!page) {
        notFound();
    }
    return [
        {
            url: `${EXTERNAL_DATA_URL}`,
        },
        {
            url: `${EXTERNAL_DATA_URL}/about`,
        },
        {
            url: `${EXTERNAL_DATA_URL}/press`,
        },
        ...page.flatMap((item) => {
            const urls = [
                { url: `${EXTERNAL_DATA_URL}/${item.slug}` }
            ];

            if (item.projects && item.kind == 1) {
                item.projects.forEach((project) => {
                    urls.push({
                        url: `${EXTERNAL_DATA_URL}/${item.slug}/${project.year}/${project.id}`
                    });

                    urls.push({
                        url: `${EXTERNAL_DATA_URL}/press/${project.year}/${project.id}`
                    });

                    if (project.reviews && Array.isArray(project.reviews)) {
                        project.reviews.forEach((review) => {
                            urls.push({
                                url: `${EXTERNAL_DATA_URL}/${item.slug}/${project.year}/${project.id}/reviews/${review.id}`
                            });
                        });
                    }
                });
            }

            return urls;
        }),
    ];
}