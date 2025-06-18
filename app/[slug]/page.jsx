import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import { readItems } from "@directus/sdk";

import Image from "next/image";
import Link from "next/link";

import styles from "./projects.module.css";

/* COMPONENTS */
import ProjectList from "@/components/ProjectList";

async function getPage(slug) {
  try {
    const page = await directus.request(
      readItems("pages", {
        fields: ["*", "*.*", "*.*.*", { file: ["*", "*.*", "*.*.*"] }],
        filter: {
          slug: { _eq: slug },
        },
      })
    );
    return page[0];
  } catch (error) {
    notFound();
  }
}

export default async function DynamicPage({ params }) {
  const page = await getPage((await params).slug);
  if (!page || !page.projects) {
    notFound();
  }

  return (
    <>
      <ProjectList page={page} />
    </>
  );
}
