import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import { readItems } from "@directus/sdk";

import Image from "next/image";
import Link from "next/link";

import styles from "./projects.module.css";

/* COMPONENTS */
import ProjectList from "@/components/ProjectList";
import Footer from "@/components/Footer";

async function getPage(slug) {
  try {
    const page = await directus.request(
      readItems("pages", {
        fields: ["*", "*.*", "*.*.*", { file: ["*", "*.*", "*.*.*"] }],
        filter: {
          slug: { _eq: slug },
          status: { _eq: "published" },
        },
      })
    );
    // Filter projects array to only include published projects
    if (page && page[0] && Array.isArray(page[0].projects)) {
      page[0].projects = page[0].projects.filter(
        (project) => project.status === "published"
      );
    }
    return page[0];
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({ params }) {
  const page = await getPage((await params).slug);
  if (!page || !page.projects) {
    notFound();
  }

  return {
    title: `${page.title_en_us.replace(
      /<[^>]+>/g,
      ""
    )} ${page.title_zh_hant_tw.replace(
      /<[^>]+>/g,
      ""
    )}  | Hong Foundation - Art`,
    description: `${page.content_en_us} ${page.content_zh_hant_tw}`,
  };
}

export default async function DynamicPage({ params }) {
  const page = await getPage((await params).slug);
  if (!page || !page.projects) {
    notFound();
  }
  //   console.log("page:", page);
  return (
    <>
      <ProjectList page={page} />
      <Footer />
    </>
  );
}
