import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import { readItem, readItems } from "@directus/sdk";

import styles from "./reviewPage.module.css";

/* COMPONENTS */
import Back from "@/components/Back";

async function getReview(review_id) {
  try {
    const review = await directus.request(
      readItems("reviews", {
        fields: ["*", "*.*", "*.*.*", { file: ["*", "*.*", "*.*.*"] }],
        filter: {
          id: { _eq: review_id },
          status: { _eq: "published" },
        },
      })
    );
    return review[0];
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({ params }) {
  const review = await getReview((await params).review_id);

  return {
    title: `Review | Hong Foundation - Art`,
    description: `Review - ${review.title.replace(/<[^>]+>/g, "")}`,
  };
}

export default async function ReviewPage({ params }) {
  const review = await getReview((await params).review_id);
  // console.log("review:", review);

  return (
    <>
      <Back />
      <div className={styles.reviewTag}>review</div>
      <div className={styles.content1280}>
        <div className={styles.twoGrid28}>
          <div className={`${styles.reviewPostSideInfo}`}>
            <div style={{ fontFamily: "metropolis" }}>
              {review.date ? review.date.split("T")[0] : ""}
            </div>
            <div>{review.from}</div>
            <div>{review.artist_name_zh_hant_tw}</div>
          </div>
          <div className={styles.mt40}>
            <div
              className={styles.reviewPostTitle}
              dangerouslySetInnerHTML={{ __html: review.title }}
            />
            <div
              className={`${styles.reviewPostContent} ${styles.mt40}`}
              dangerouslySetInnerHTML={{ __html: review.content }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
