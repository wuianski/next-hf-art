import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import { readItem } from "@directus/sdk";

import Image from "next/image";
import styles from "./about.module.css"; // Adjust the path as necessary

/* COMPONENTS */
import AboutTabs from "@/components/AboutTabs";

async function getAbout() {
  try {
    return await directus.request(
      readItem("about_page", 1, {
        fields: ["*", "*.*", "*.*.*", { file: ["*", "*.*", "*.*.*"] }],
      })
    );
  } catch (error) {
    notFound();
  }
}

export default async function About() {
  const about = await getAbout();
  //   console.log("About:", about);
  return (
    <div>
      <div className={styles.fullpage_container}>
        <Image
          src={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${about.cover.filename_disk}`}
          alt={about.cover.title}
          fill
          style={{ objectFit: "cover" }}
        />
        <AboutTabs about={about} />
      </div>
    </div>
  );
}
