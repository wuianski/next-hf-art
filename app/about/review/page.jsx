import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import { readItem } from "@directus/sdk";

import styles from "@/app/[slug]/[year]/[id]/review/[review_id]/reviewPage.module.css"; // Adjust the path as necessary

/* COMPONENTS */
import Back from "@/components/Back";

async function getAboutReview() {
  try {
    return await directus.request(
      readItem("reviews", 62, {
        fields: ["*", "*.*", "*.*.*", { file: ["*", "*.*", "*.*.*"] }],
      })
    );
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata() {
  const aboutReview = await getAboutReview();

  return {
    title: `Review | Hong Foundation - Art`,
    description: `Review - ${aboutReview.title.replace(/<[^>]+>/g, "")}`,
  };
}

export default async function AboutReview() {
  const aboutReview = await getAboutReview();
  //   console.log("aboutReview:", aboutReview);
  return (
    <div>
      <Back />
      <div className={styles.reviewTag}>review</div>
      <div className={styles.content1280}>
        <div className={styles.twoGrid28}>
          <div className={`${styles.reviewPostSideInfo} `}>
            <div style={{ fontFamily: "metropolis" }}>
              {aboutReview.date ? aboutReview.date.split("T")[0] : ""}
            </div>
            <div>{aboutReview.from}</div>
            <div>{aboutReview.artist_name_zh_hant_tw}</div>
          </div>
          <div className={styles.mt40}>
            <div
              className={styles.reviewPostTitle}
              dangerouslySetInnerHTML={{ __html: aboutReview.title }}
            />
            <div
              className={`${styles.reviewPostContent} ${styles.mt40}`}
              dangerouslySetInnerHTML={{ __html: aboutReview.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
