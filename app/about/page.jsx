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

export const metadata = {
  title: `About | Hong Foundation - Art`,
  description: "About, timeline, review and info of Hong Foundation.",
};

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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          style={{ objectFit: "cover" }}
          className={styles.desktop_bg}
          placeholder="blur"
          blurDataURL={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${about.cover.filename_disk}?blur=100`}
        />
        <Image
          src={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${about.cover_small.filename_disk}`}
          alt={about.cover.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          style={{ objectFit: "cover" }}
          className={styles.mobile_bg}
          placeholder="blur"
          blurDataURL={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${about.cover.filename_disk}?blur=100`}
        />
        <AboutTabs about={about} />
      </div>
    </div>
  );
}
