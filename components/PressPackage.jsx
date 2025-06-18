"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import styles from "@/components/pressPackage.module.css";
import Link from "next/link";
import Image from "next/image";

export default function ProjectList({ projects }) {
  //   console.log("projects:", projects);

  return (
    <>
      <div className={styles.content1280}>
        <div className={styles.pressTitle}>press package</div>
        <div>
          {projects.map((node) => (
            <div key={node.id}>
              <div className={styles.twoGrid37_press}>
                <div className={styles.pressImg}>
                  <Image
                    className={styles.pressCoverImg}
                    src={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${node.cover.filename_disk}`}
                    fill
                    alt="press cover image"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div>
                  <div className={styles.pressTextBlk}>
                    <span className={styles.pressTextEN}>
                      {node.pages_id.id === 1 && (
                        <span>THE QUESTION PROJECT</span>
                      )}
                      {node.pages_id.id === 5 && <span>TUNG CHUNG PRIZE</span>}
                    </span>
                    <span className={styles.pressTextYear}>
                      <span>{node.year}</span>
                    </span>
                    <span className={styles.pressTextTW}>
                      {node.pages_id.id === 1 && <span>問問題計畫</span>}
                      {node.pages_id.id === 5 && <span>銅鐘藝術賞</span>}
                    </span>
                  </div>

                  <div className={styles.pressLinkBlk}>
                    {node.file_zip && (
                      <a
                        href={node.file_zip.publicURL}
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
                        href={node.file_pdf.publicURL}
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
    </>
  );
}
