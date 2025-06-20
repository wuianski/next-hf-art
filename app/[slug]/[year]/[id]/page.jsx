import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import { readItem, readItems } from "@directus/sdk";

import Image from "next/image";
import styles from "./projectPage.module.css";

/* COMPONENTS */
import ProjectContent from "@/components/ProjectContent";

async function getProject(year, id) {
  try {
    const project = await directus.request(
      readItems("projects", {
        fields: ["*", "*.*", "*.*.*", { file: ["*", "*.*", "*.*.*"] }],
        filter: {
          year: { _eq: year },
          id: { _eq: id },
        },
      })
    );
    return project[0];
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({ params }) {
  const project = await getProject((await params).year, (await params).id);

  return {
    title: `${project.title_en_us} ${project.title_zh_hant_tw.replace(
      /<[^>]+>/g,
      ""
    )}  | Hong Foundation - Art`,
    description: `${project.pages_id.title_en_us} ${
      project.pages_id.title_zh_hant_tw
    } - ${project.title_en_us} ${project.title_zh_hant_tw.replace(
      /<[^>]+>/g,
      ""
    )}`,
  };
}

export default async function ProjectPage({ params }) {
  const project = await getProject((await params).year, (await params).id);
  //   console.log("project:", project);

  return (
    <>
      <ProjectContent project={project} />
    </>
  );
}
