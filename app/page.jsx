import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import { readItems } from "@directus/sdk";
import styles from "./home.module.css";
import Image from "next/image";
import Link from "next/link";

async function getPages() {
  try {
    return await directus.request(
      readItems("pages", {
        sort: ["sort"],
        fields: ["*", "*.*", { file: ["*", "*.*"] }],
        filter: {
          _and: [
            // {
            //   status: {
            //     _eq: "published",
            //   },
            // },
            {
              sort: {
                _neq: 5,
              },
            },
          ],
        },
      })
    );
  } catch (error) {
    notFound();
  }
}

export default async function HomePage() {
  const pages = await getPages();
  //   console.log("pages:", pages);
  return (
    <div id={styles.fullpage_container}>
      <div id={styles.project_container}>
        <div className={styles.grid_container}>
          {pages.map((page, idx) => (
            <div key={page.id} id={styles[`item${page.sort}`]}>
              <div className={styles.tagName}>
                <div id={styles[`pTag_${page.sort}`]}>{page.tag_name}</div>
              </div>

              <div className={styles.h100}>
                <Link href={`/${page.slug}`}>
                  <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                    }}
                    // className={styles.bgCoverImg}
                  >
                    <Image
                      src={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${page.cover.filename_disk}`}
                      alt={page.cover.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 90vw"
                      quality={100}
                      style={{
                        objectFit: "cover",
                      }}
                      //   className={styles.bgCoverImg}
                    />
                  </div>

                  <div className={styles.blcCtr}>
                    <p className={styles[`fullPName${page.sort}`]}>
                      {page.menu_text_en_us}
                    </p>
                    <p className={styles[`fullPNameTW${page.sort}`]}>
                      {page.menu_text_zh_hant_tw}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
