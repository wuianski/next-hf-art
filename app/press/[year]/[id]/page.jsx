import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import { readItem, readItems } from "@directus/sdk";

/* COMPONENTS */
import PressContent from "@/components/PressContent";

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
    title: `Press images | Hong Foundation - Art`,
    description: `Press images - ${project.pages_id.title_en_us} ${project.year} ${project.title_en_us}`,
  };
}

export default async function ProjectPage({ params }) {
  const project = await getProject((await params).year, (await params).id);
  //   console.log("project:", project);

  return (
    <>
      <PressContent project={project} />
    </>
  );
}
