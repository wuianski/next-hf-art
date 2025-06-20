"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import styles from "@/components/pressContent.module.css";

export default function ProjectContent({ project }) {
  //   console.log("project:", project);

  return (
    <>
      <div className={styles.content1280}>
        <div className={styles.pressImgTitleBlk}>
          <div>
            <span className={styles.pressImgTitle}>press images</span>
          </div>
          <div>
            <span className={styles.pressImgTextBlk}>
              <span className={styles.pressImgText}>
                {project.pages_id.id === 1 && (
                  <span className={styles.en}>THE QUESTION</span>
                )}
                {project.pages_id.id === 5 && (
                  <span className={styles.en}>TUNG CHUNG ART PRIZE</span>
                )}
              </span>
              <span className={styles.pressImgText}>
                <span className={styles.en}>{project.year}</span>
              </span>
              <span className={styles.pressImgText}>
                {project.pages_id.id === 1 && (
                  <span className={styles.tw}>問問題計畫</span>
                )}
                {project.pages_id.id === 5 && (
                  <span className={styles.tw}>銅鐘藝術賞</span>
                )}
              </span>
            </span>
            <a
              onClick={() => window.history.back()}
              onKeyDown={() => window.history.back()}
              role="button"
              tabIndex="0"
            >
              <span
                className={`${styles.backBtn} ${styles.fr}`}
                role="button"
                tabIndex="0"
              >
                <img
                  src="/ArrowLeft_2.svg"
                  alt="back button"
                  width={60}
                  height={16}
                />
                <span className={styles.backText}>back</span>
              </span>
            </a>
          </div>
        </div>
        <div>
          {project.images && (
            <div>
              {project.images.map((image, index) => (
                <div key={index}>
                  <div
                    className={`${styles.twoGrid64_pressImg} ${styles.mt20}`}
                  >
                    <div className={styles.pressSingleImg_m}>
                      <Image
                        src={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${image.directus_files_id.filename_disk}`}
                        alt="press cover image"
                        width={300}
                        height={300}
                        className={styles.pressSingleImg_d}
                        style={{
                          objectFit: "cover",
                        }}
                        placeholder="blur"
                        blurDataURL={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${image.directus_files_id.filename_disk}?blur=100`}
                      />
                    </div>
                    <div className={styles.pressImgContent_m}>
                      <div
                        className={styles.pressImgContentTxt_tw}
                        dangerouslySetInnerHTML={{
                          __html: project.artist_name_zh_hant_tw,
                        }}
                      />
                      <div
                        className={styles.pressImgContentTxt_en}
                        dangerouslySetInnerHTML={{
                          __html: project.artist_name_en_us,
                        }}
                      />
                      <div className={styles.pressImgContentTxt_tw}>
                        <div>{image.directus_files_id.title}</div>
                      </div>

                      <div className={styles.pressImgContentTxt_en}>
                        {project.year}
                      </div>
                      <div className={styles.pressImgContentTxtCC}>
                        <div>{image.directus_files_id.description}</div>
                      </div>

                      <div className={styles.pressImgContentTxtDownload}>
                        <a
                          href={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${image.directus_files_id.filename_disk}?download=`}
                          target="_blank"
                          rel="noreferrer"
                          download
                        >
                          <span className="">download</span>
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
                      </div>
                    </div>
                    <div className={styles.pressSingleImg}>
                      <Image
                        src={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${image.directus_files_id.filename_disk}`}
                        alt="press cover image"
                        width={300}
                        height={300}
                        className={styles.pressSingleImg_d}
                        style={{
                          objectFit: "cover",
                        }}
                        placeholder="blur"
                        blurDataURL={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${image.directus_files_id.filename_disk}?blur=100`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
