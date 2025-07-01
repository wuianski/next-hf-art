"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import styles from "@/components/pressPackage.module.css";
import Link from "next/link";
import Image from "next/image";

export default function ProjectList({ projects }) {
  //   console.log("projects:", projects);
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 6;
  const totalPages = Math.ceil(projects.length / PAGE_SIZE);
  const paginatedProjects = projects.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  return (
    <>
      <div className={styles.content1280}>
        <div className={styles.pressTitle}>press package</div>
        <div>
          {paginatedProjects.map((node) => (
            <div key={node.id}>
              <div className={styles.twoGrid37_press}>
                <div className={styles.pressImg}>
                  <Image
                    className={styles.pressCoverImg}
                    src={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${node.cover.filename_disk}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    alt="press cover image"
                    style={{
                      objectFit: "cover",
                    }}
                    placeholder="blur"
                    blurDataURL={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${node.cover.filename_disk}?blur=100`}
                  />
                </div>
                <div>
                  <div className={styles.pressTextBlk}>
                    <span className={styles.pressTextEN}>
                      <span>{node.pages_id.menu_text_en_us}</span>
                    </span>
                    <span className={styles.pressTextYear}>
                      <span>{node.year}</span>
                    </span>
                    <span className={styles.pressTextTW}>
                      <span> {node.pages_id.menu_text_zh_hant_tw}</span>
                    </span>
                  </div>

                  <div className={styles.pressLinkBlk}>
                    {node.file_zip && (
                      <a
                        href={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${node.file_zip.filename_disk}?download=`}
                        target="_blank"
                        rel="noreferrer"
                        download
                      >
                        <span>Press Package</span>
                        <span
                          className={`${styles.downloadBtn} ${styles.pressLink}`}
                          role="button"
                          tabIndex="0"
                        >
                          <img
                            className={styles.downloadBtnImg}
                            src="/download.svg"
                            alt="download button"
                          />
                        </span>
                      </a>
                    )}
                    {node.file_pdf && (
                      <a
                        href={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${node.file_pdf.filename_disk}?download=`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>Press Release</span>
                        <span
                          className={`${styles.downloadBtn} ${styles.pressLink}`}
                          role="button"
                          tabIndex="0"
                        >
                          <img
                            className={styles.downloadBtnImg}
                            src="/download.svg"
                            alt="download button"
                          />
                        </span>
                      </a>
                    )}
                    <Link href={`/press/${node.year}/${node.id}`}>
                      <span style={{ fontFamily: "metropolis" }}>
                        Press Images
                      </span>
                      <span
                        className={`${styles.arrowGoTo} ${styles.pressLink}`}
                        role="button"
                        tabIndex="0"
                      >
                        <img
                          src="/ArrowRight_2.svg"
                          alt="internal link button"
                        />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, idx) => (
            <div
              key={idx + 1}
              onClick={() => {
                setCurrentPage(idx + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                fontWeight: currentPage === idx + 1 ? "bold" : "normal",
                color: currentPage === idx + 1 ? "#e77832" : "#000",
              }}
            >
              {idx + 1}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
