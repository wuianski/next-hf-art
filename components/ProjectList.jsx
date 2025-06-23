"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import styles from "@/app/[slug]/projects.module.css";
import Link from "next/link";
import Image from "next/image";
import { Fade, Slide } from "react-awesome-reveal";

export default function ProjectList({ page }) {
  //   console.log("page:", page);
  /* sort projects */
  const projects = page.projects
    .map((project) => ({
      id: project.id,
      year: project.year,
      artist_name_en_us: project.artist_name_en_us,
      artist_name_zh_hant_tw: project.artist_name_zh_hant_tw,
      title_en_us: project.title_en_us,
      title_zh_hant_tw: project.title_zh_hant_tw,
      main_video_url: project.main_video_url,
      begin_exhibition: project.begin_exhibition,
      end_exhibition: project.end_exhibition,
    }))
    .sort((a, b) => {
      if (b.year !== a.year) {
        return b.year - a.year;
      }
      // If year is the same, sort by begin_exhibition (descending)
      if (b.begin_exhibition && a.begin_exhibition) {
        return new Date(b.begin_exhibition) - new Date(a.begin_exhibition);
      }
      return 0;
    });

  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = page.kind == 1 ? 3 : page.kind == 2 ? 6 : 5;
  const totalPages = Math.ceil(projects.length / PAGE_SIZE);
  const paginatedProjects = projects.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  let projectsList;
  if (page.kind == 1) {
    projectsList = (
      //   <Slide cascade delay={500} duration={1000} damping={0.1} direction="up">
      <div className={styles.projectsList}>
        {paginatedProjects.map((project) => (
          <div key={project.id}>
            <Link
              href={`/${page.slug}/${project.year}/${project.id}`}
              className={styles.pList_link}
            >
              <div className={styles.pList}>
                <div className={styles.pList_year}>{project.year}</div>
                <div className={styles.pList_title}>
                  {page.slug == "tung-chung-prize" ||
                  page.slug == "extension" ||
                  page.slug == "special-partnership" ? (
                    <>
                      <div
                        className={styles.pList_titleTW}
                        dangerouslySetInnerHTML={{
                          __html: project.title_zh_hant_tw,
                        }}
                      />
                      <div
                        className={styles.pList_titleEN}
                        dangerouslySetInnerHTML={{
                          __html: project.title_en_us,
                        }}
                      />
                    </>
                  ) : page.slug == "the-question" ? (
                    <div
                      className={styles.pList_titleEN_Q}
                      dangerouslySetInnerHTML={{
                        __html: project.title_en_us,
                      }}
                    />
                  ) : null}
                </div>
                <div className={styles.line}></div>
                <div className={styles.pList_aName}>
                  <div
                    className={styles.pList_aNameTW}
                    dangerouslySetInnerHTML={{
                      __html: project.artist_name_zh_hant_tw,
                    }}
                  />
                  <div
                    className={styles.pList_aNameEN}
                    dangerouslySetInnerHTML={{
                      __html: project.artist_name_en_us,
                    }}
                  />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      //</Slide>
    );
  } else if (page.kind == 2) {
    projectsList = (
      //   <Slide cascade delay={500} duration={1000} damping={0.1} direction="up">
      <div className={styles.projectsList}>
        {paginatedProjects.map((project) => (
          <div key={project.id} className={styles.aList}>
            <div className={styles.aList_title}>
              <div className={styles.aList_titleTW}>
                {project.title_zh_hant_tw}
              </div>
              <div className={styles.aList_titleEN}>{project.title_en_us}</div>
            </div>
            <div className={styles.aList_yearBlk}>
              <div className={styles.aList_year}>{project.year}</div>
            </div>
            <div className={styles.aList_aName}>
              <div className={styles.aList_aNameTW}>
                {project.artist_name_zh_hant_tw}
              </div>
              <div className={styles.aList_aNameEN}>
                {project.artist_name_en_us}
              </div>
            </div>
            <div className={styles.aList_linkBlk}>
              {project.main_video_url && (
                <div className={styles.aList_linkBtn}>
                  <a
                    href={project.main_video_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className={styles.hyperlinkBtnImg}
                      src="/hyperlink.svg"
                      alt="link to artwork"
                    />
                  </a>
                </div>
              )}
            </div>
            <div className={styles.aList_yearBlk_m}>
              <div className={styles.aList_year}>{project.year}</div>
            </div>
          </div>
        ))}
      </div>
      //   </Slide>
    );
  } else {
    projectsList = null;
  }

  return (
    <>
      {/* Zero Section - Fullscreen Image / hong-x-panasonic is different layout
       */}
      {page.slug == "hong-x-panasonic" ? (
        <>
          <div className={styles.content_hongXPanasonic}>
            <div className={styles.projectTagFixed}>sponsorship</div>
            <div className={styles.pageTitle_hongXPanasonic} id="pageTopH">
              <p>{page.title_en_us}</p>
            </div>
            <div>
              <div>
                <div className={`${styles.twoGrid73}`}>
                  <div>
                    <div className={styles.artworks_textTW}>
                      {page.content_zh_hant_tw}
                    </div>
                    <div className={styles.artworks_textEN}>
                      {page.content_en_us}
                    </div>
                  </div>

                  <div className={styles.applyHBlk}>
                    <div className={styles.applyH}>
                      <a
                        href={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${page.apply_for.filename_disk}?download=`}
                        target="_blank"
                        rel="noreferrer"
                        download="申請辦法"
                      >
                        <span className={styles.downloadBtnTextH}>
                          申請辦法
                        </span>
                        <span
                          className={styles.downloadBtn}
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
                </div>
                <div className={`${styles.twoGrid73}`}>
                  <div>
                    {page.equipment && (
                      <div className={styles.twoGrid55}>
                        {page.equipment.map((myEquipment) => (
                          <div key={myEquipment.id} className={styles.equipBlk}>
                            {myEquipment.status === "draft" && <span></span>}
                            {myEquipment.status === "published" && (
                              <div>
                                <div className={styles.equipNameTW}>
                                  {myEquipment.name_zh_hant_tw}
                                </div>
                                <div className={styles.equipNameEN}>
                                  {myEquipment.name_en_us}
                                </div>
                                <div
                                  className={styles.equipDetailText}
                                  dangerouslySetInnerHTML={{
                                    __html: myEquipment.detial,
                                  }}
                                />

                                <a
                                  href={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${myEquipment.document.filename_disk}?download=`}
                                  target="_blank"
                                  rel="noreferrer"
                                  download="spec"
                                >
                                  <div
                                    className={styles.downloadBtn}
                                    role="button"
                                    tabIndex="0"
                                  >
                                    <Image
                                      className={styles.downloadBtnImg}
                                      src="/download.svg"
                                      alt="download button"
                                      width={21}
                                      height={21}
                                    />
                                  </div>
                                </a>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={styles.panasonicLogoBlk}>
                    <div className={styles.panasonicLogo}>
                      <img
                        src="/Panasonic.jpg"
                        alt="Panasonic logo"
                        className={styles.panasonicLogoImg}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.fullpage_container}>
          <Image
            src={
              page.slug === "canopy"
                ? `${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${page.cover_inside.filename_disk}`
                : `${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${page.cover.filename_disk}`
            }
            alt={page.cover.title}
            fill
            style={{ objectFit: "cover" }}
            placeholder="blur"
            blurDataURL={
              page.slug === "canopy"
                ? `${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${page.cover_inside.filename_disk}?blur=100`
                : `${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${page.cover.filename_disk}?blur=100`
            }
          />
          {/* Logo and Project Tag inside fullpage image */}
          <a
            href="https://hongfoundation.org.tw/"
            target="_blank"
            rel="noreferrer"
          >
            <Fade cascade delay={500} duration={500} damping={0.1} triggerOnce>
              <Image
                priority
                src="/logo_hf.svg"
                alt="Hong Foundation Logo"
                width={120}
                height={210}
                className={styles.logoHF}
              />
            </Fade>
          </a>
          <Fade cascade delay={500} duration={500} damping={0.5} triggerOnce>
            <div className={styles.projectTag}>{page.tag_name}</div>
          </Fade>
          <Fade cascade delay={500} duration={2000} damping={0.1} triggerOnce>
            <div className={styles.blcCtrTitle}>
              <p className={`${styles.txtCtr} ${styles.fullPName_EN}`}>
                {page.menu_text_en_us}
              </p>
              <p className={`${styles.txtCtr} ${styles.fullPName_TW}`}>
                {page.menu_text_zh_hant_tw}
              </p>
            </div>

            <div className={styles.blcCtrIntro}>
              <div className={styles.pageIntro}>
                <p className={styles.pageIntroTW}>{page.content_zh_hant_tw}</p>
                <p className={styles.pageIntroEN}>{page.content_en_us}</p>
              </div>
              {page.slug == "canopy" && (
                <div className={styles.pageDownloadC}>
                  <span>
                    {/* <a href={page.planimetric_map.publicURL} download="平面圖"> */}
                    <a
                      href={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${page.planimetric_map.filename_disk}?download=`}
                      target="_blank"
                      rel="noreferrer"
                      download="平面圖"
                    >
                      <span className={styles.downloadBtnTextC}>平面圖</span>
                      <span
                        className={styles.downloadBtn}
                        role="button"
                        tabIndex="0"
                      >
                        <img
                          className={styles.downloadBtnImgC}
                          src="/download.svg"
                          alt="download button"
                        />
                      </span>
                    </a>
                  </span>
                  <span className={styles.secondDownloadC}>
                    {/* <a href={page.apply_for.publicURL} download="申請辦法"> */}
                    <a
                      href={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${page.apply_for.filename_disk}?download=`}
                      target="_blank"
                      rel="noreferrer"
                      download="申請辦法"
                    >
                      <span className={styles.downloadBtnTextC}>申請辦法</span>
                      <span
                        className={styles.downloadBtn}
                        role="button"
                        tabIndex="0"
                      >
                        <img
                          className={styles.downloadBtnImgC}
                          src="/download.svg"
                          alt="download button"
                        />
                      </span>
                    </a>
                  </span>
                </div>
              )}
            </div>
          </Fade>

          <div
            className={styles.pdTB80}
            role="button"
            tabIndex="0"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            <img
              className={styles.arrowDown}
              src="/ArrowDown_2.svg"
              alt="arrow-down"
              height="74px"
            />
          </div>
        </div>
      )}
      {/* Projects List */}
      {/* <Slide cascade delay={500} duration={1000} damping={0.1} direction="up"> */}
      <div>{projectsList}</div>
      {/* </Slide> */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, idx) => (
            <div
              key={idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
              style={{
                fontWeight: currentPage === idx + 1 ? "bold" : "normal",
                // textDecoration: currentPage === idx + 1 ? "underline" : "none",
                color: currentPage === idx + 1 ? "#e77832" : "#000",
              }}
            >
              {idx + 1}
            </div>
          ))}
        </div>
      )}
      {/* Arrow Up */}
      <div className={styles.mt30}>
        <div
          className={`${styles.arrowUp} `}
          style={{ paddingBottom: "20px" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          role="button"
          tabIndex="0"
        >
          <img src="/ArrowUp_2.svg" alt="arrow-up" height="74px" />
        </div>
      </div>
    </>
  );
}
