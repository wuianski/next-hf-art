import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import { readItem, readItems } from "@directus/sdk";

import Image from "next/image";
// import styles from "./projectPage.module.css";

/* COMPONENTS */
import PressPackage from "@/components/PressPackage";

async function getProjects() {
  try {
    const projects = await directus.request(
      readItems("projects", {
        fields: ["*", "*.*", "*.*.*", { file: ["*", "*.*", "*.*.*"] }],
        filter: {
          pages_id: { _in: [1, 5] },
          status: { _eq: "published" },
        },
        sort: ["-year"],
      })
    );
    return projects;
  } catch (error) {
    notFound();
  }
}

export default async function ProjectPage() {
  const projects = await getProjects();
  //   console.log("projects:", projects.length);

  return (
    <>
      <PressPackage projects={projects} />
    </>
  );
}
