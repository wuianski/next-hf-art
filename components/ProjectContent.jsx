"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

import styles from "@/app/[slug]/[year]/[id]/projectPage.module.css";
import Video from "@/components/Video";
import React from "react";
import Slider from "react-slick";
import NavigateNext from "@mui/icons-material/NavigateNext";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import { Fade } from "react-awesome-reveal";

/* Slick Carousel Settings */
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="slider-arrow" onClick={onClick}>
      <Image
        src="/ArrowRight_2.svg"
        alt="Next Arrow"
        width={60}
        height={60}
        style={{
          ...style,
          position: "absolute",
          top: "calc(50% - 30px)",
          right: "38px",
          zIndex: 1,
          cursor: "pointer",
        }}
      />
    </div>
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="slider-arrow" onClick={onClick}>
      <Image
        src="/ArrowLeft_2.svg"
        alt="Next Arrow"
        width={60}
        height={60}
        style={{
          ...style,
          position: "absolute",
          top: "calc(50% - 30px)",
          left: "38px",
          zIndex: 1,
          cursor: "pointer",
        }}
      />
    </div>
  );
}
var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

export default function ProjectContent({ project }) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isVisibleV, setIsVisibleV] = useState(false);
  const toggleVisibilityV = () => setIsVisibleV(!isVisibleV);
  const [isVisibleA, setIsVisibleA] = useState(false);
  const toggleVisibilityA = () => setIsVisibleA(!isVisibleA);
  //   console.log("project:", project.images);
  const [shownComments, setShownComments] = useState({});
  const toggleComment = (id) => {
    setShownComments((prevShownComments) => ({
      ...prevShownComments,
      [id]: !prevShownComments[id],
    }));
  };

  // var projectPageSlug, if project.pages_id.id is 1, then the value is "the-question", if it is 2, then the value is "extension", if it is 5, then the value is "tung-chung-prize", else is null
  let projectPageSlug = null;
  let projectPageTagName = null;
  if (project.pages_id.id === 1) {
    projectPageSlug = "the-question";
    projectPageTagName = "commission";
  } else if (project.pages_id.id === 2) {
    projectPageSlug = "extension";
    projectPageTagName = "sponsorship";
  } else if (project.pages_id.id === 5) {
    projectPageSlug = "tung-chung-prize";
    projectPageTagName = "prize";
  } else if (project.pages_id.id === 6) {
    projectPageSlug = "special-partnership";
    projectPageTagName = "collaboration";
  } else {
    projectPageSlug = null;
    projectPageTagName = null;
  }

  //sort projcect.reviews by date in descending order
  project.reviews.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <>
      {/* Zero Section - Fullscreen Image */}
      <div className={styles.fullpage_container}>
        <Image
          src={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${project.cover.filename_disk}`}
          alt={project.cover.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          style={{ objectFit: "cover" }}
          placeholder="blur"
          blurDataURL={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${project.cover.filename_disk}?blur=100`}
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
          <div className={styles.projectTag}>{projectPageTagName}</div>
        </Fade>
        <Fade cascade delay={500} duration={2000} damping={0.1} triggerOnce>
          <div className={styles.blcCtr}>
            <div className={`${styles.txtCtr} ${styles.fullPYear}`}>
              {project.year}
            </div>

            <div
              className={`${styles.txtCtr} ${styles.fullPTitleTW}`}
              dangerouslySetInnerHTML={{ __html: project.title_zh_hant_tw }}
              style={{ display: project.pages_id.id == 1 ? "none" : "block" }}
            />
            <div
              className={`${styles.txtCtr}  ${
                project.pages_id.id == 1
                  ? styles.fullPTitleEN_Q
                  : styles.fullPTitleEN
              } `}
              dangerouslySetInnerHTML={{ __html: project.title_en_us }}
            />

            <div className={`${styles.txtCtr} ${styles.fullPDate}`}>
              {project.begin_exhibition && (
                <span>{project.begin_exhibition}</span>
              )}
              {project.begin_exhibition && (
                <span> - {project.end_exhibition}</span>
              )}
            </div>
            <div
              className={`${styles.txtCtr} ${styles.fullPNameTW}`}
              dangerouslySetInnerHTML={{
                __html: project.artist_name_zh_hant_tw,
              }}
            />
            <div
              className={`${styles.txtCtr} ${styles.fullPNameEN}`}
              dangerouslySetInnerHTML={{ __html: project.artist_name_en_us }}
            />
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
      <div className={styles.content_container}>
        {/* First Section - Context */}
        <div className={styles.firstSec}>
          <div className={styles.secName}>essay</div>
          <div className={styles.summaryBlock}>
            <div
              dangerouslySetInnerHTML={{ __html: project.summary_zh_hant_tw }}
              className={styles.summaryTW}
            />
            <div
              dangerouslySetInnerHTML={{ __html: project.summary_en_us }}
              className={styles.summaryEN}
            />
          </div>
          <div className={styles.mt20}>
            <div className={styles.openBlock}>
              <div
                className={styles.fr}
                onClick={toggleVisibility}
                onKeyDown={toggleVisibility}
                role="button"
                tabIndex="0"
              >
                {!isVisible && (
                  <img
                    className={styles.openImg}
                    src="/plus.svg"
                    alt="open content block"
                  />
                )}
              </div>
            </div>
          </div>
          {isVisible && (
            <div>
              <div className={`${styles.contentBlock} `}>
                <div
                  className={styles.contentTW}
                  dangerouslySetInnerHTML={{
                    __html: project.content_zh_hant_tw,
                  }}
                />
                <div
                  className={styles.contentEN}
                  dangerouslySetInnerHTML={{ __html: project.content_en_us }}
                />
              </div>
              <div
                className={styles.closeBlock}
                onClick={toggleVisibility}
                onKeyDown={toggleVisibility}
                role="button"
                tabIndex="0"
              >
                <img
                  className={styles.closeImg}
                  src="/minus.svg"
                  alt="close content block"
                />
              </div>
            </div>
          )}
        </div>
        {/* Second Section - Video */}
        <div className={styles.mt60}>
          {project.main_video_url && (
            <div>
              <div>
                <Video
                  videoSrcURL={project.main_video_url}
                  videoTitle={project.main_video_title_en_us}
                />
                <div className={styles.vidText}>
                  <div className={styles.mainVidInfo}>
                    {project.main_video_info}
                  </div>
                  <div className={styles.titleBlock}>
                    <div className={styles.titleTW}>
                      {project.main_video_title_zh_hant_tw}
                    </div>
                    <div className={styles.titleEN}>
                      {project.main_video_title_en_us}
                    </div>
                  </div>
                  {project.main_video_description_zh_hant_tw && (
                    <div className={styles.vidDes}>
                      <div className={styles.openBlock}>
                        <div
                          className={styles.fr}
                          onClick={toggleVisibilityV}
                          onKeyDown={toggleVisibilityV}
                          role="button"
                          tabIndex="0"
                        >
                          {!isVisibleV && (
                            <img
                              className={styles.openImg}
                              src="/plus.svg"
                              alt="open content block"
                            />
                          )}
                        </div>
                      </div>
                      {isVisibleV && (
                        <div className={styles.vidText_m}>
                          <div className={styles.video_textBlock}>
                            <div className={styles.video_textTW}>
                              {project.main_video_description_zh_hant_tw}
                            </div>
                            <div className={styles.video_textEN}>
                              {project.main_video_description_en_us}
                            </div>
                          </div>
                          <div
                            className={styles.closeBlock}
                            onClick={toggleVisibilityV}
                            onKeyDown={toggleVisibilityV}
                            role="button"
                            tabIndex="0"
                          >
                            <img
                              className={styles.closeImg}
                              src="/minus.svg"
                              alt="close content block"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Third Section - Images */}
        <div className={`${styles.thirdSec} ${styles.mt60}`}>
          <div>
            <Slider {...settings}>
              {project.images.map((image, index) => (
                <div key={index} className={styles.imgBlock}>
                  <Image
                    src={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${image.directus_files_id.filename_disk}`}
                    alt={image.directus_files_id.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    quality={100}
                    style={{
                      objectFit: "contain",
                    }}
                    placeholder="blur"
                    blurDataURL={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${image.directus_files_id.filename_disk}?blur=100`}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        {/* Fourth Section - Artist */}
        <div className={`${styles.artistSec} ${styles.mt60}`}>
          <div className={styles.secNameArtist}>artist</div>
          <div className={`${styles.titleBlock} ${styles.fr_m}`}>
            <span
              className={styles.titleTW}
              dangerouslySetInnerHTML={{
                __html: project.artist_name_zh_hant_tw,
              }}
            />
            <span
              className={styles.titleEN}
              dangerouslySetInnerHTML={{ __html: project.artist_name_en_us }}
            />
          </div>
          <div className={styles.mt20}>
            <div
              className={styles.fr}
              onClick={toggleVisibilityA}
              onKeyDown={toggleVisibilityA}
              role="button"
              tabIndex="0"
            >
              {!isVisibleA && (
                <img
                  className={styles.openImg}
                  src="/plus.svg"
                  alt="open content block"
                />
              )}
            </div>
          </div>
          {isVisibleA && (
            <div>
              <div className={`${styles.textBlockArtist} ${styles.fr}`}>
                <div
                  className={`${styles.artist_textTW}`}
                  dangerouslySetInnerHTML={{
                    __html: project.artist_introduction_zh_hant_tw,
                  }}
                />
                <div
                  className={`${styles.artist_textEN}`}
                  dangerouslySetInnerHTML={{
                    __html: project.artist_introduction_en_us,
                  }}
                />
                <div
                  className={styles.closeBlock}
                  onClick={toggleVisibilityA}
                  onKeyDown={toggleVisibilityA}
                  role="button"
                  tabIndex="0"
                >
                  <img
                    className={styles.closeImg}
                    src="/minus.svg"
                    alt="close content block"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Fifth Section - Event */}
        <div className={`${styles.eventSec} ${styles.mt60}`}>
          {project.events.length > 0 && (
            <div className={styles.secName}>event</div>
          )}

          {project.events && (
            <div>
              <div className={styles.topMinus20}>
                <div className={styles.twoGrid55}>
                  {project.events.map((event) => (
                    <div
                      key={event.id}
                      className={`${styles.m_inlineBlock} ${styles.eventBlock}`}
                    >
                      {event.status === "draft" && <span></span>}
                      {event.status === "published" && (
                        <div>
                          <div className={styles.eventCover}>
                            {event.video_url ? (
                              <Video
                                videoSrcURL={event.video_url}
                                videoTitle={event.title_en_us}
                              />
                            ) : event.image ? (
                              <Image
                                src={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${event.image.filename_disk}`}
                                fill
                                alt={event.image.title}
                                style={{ objectFit: "cover" }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 90vw"
                                quality={100}
                                placeholder="blur"
                                blurDataURL={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${event.image.filename_disk}?blur=100`}
                              />
                            ) : null}
                          </div>
                          <div
                            className={`${styles.titleBlock} ${styles.mb20}`}
                          >
                            <div className={styles.titleTW}>
                              {event.title_zh_hant_tw}
                            </div>
                            <div className={styles.titleEN}>
                              {event.title_en_us}
                            </div>
                          </div>
                          <div className={styles.openBlock}>
                            <div
                              className={styles.fr}
                              onClick={() => toggleComment(event.id)}
                              onKeyDown={() => toggleComment(event.id)}
                              role="button"
                              tabIndex="0"
                            >
                              {!shownComments[event.id] ? (
                                <img
                                  className={styles.openImg}
                                  src="/plus.svg"
                                  alt="open content block"
                                />
                              ) : null}
                            </div>
                          </div>
                          {shownComments[event.id] ? (
                            <div className={styles.textBlock}>
                              <div className={styles.event_textTW}>
                                {event.introduction_zh_hant_tw}
                              </div>
                              <div className={styles.event_textEN}>
                                {event.introduction_en_us}
                              </div>
                              <div
                                className={styles.closeBlock}
                                onClick={() => toggleComment(event.id)}
                                onKeyDown={() => toggleComment(event.id)}
                                role="button"
                                tabIndex="0"
                              >
                                <img
                                  className={styles.closeImg}
                                  src="/minus.svg"
                                  alt="close content block"
                                />
                              </div>
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Sixth Section - Review */}
        <div className={`${styles.reviewSec} ${styles.mt60} `}>
          {project.reviews.length > 0 && (
            <div className={styles.secNameReview}>review</div>
          )}
          {project.reviews && (
            <div>
              {project.reviews.map((review) => (
                <div key={review.id}>
                  {review.status === "published" && (
                    <Link
                      href={`/${projectPageSlug}/${project.year}/${project.id}/review/${review.id}`}
                    >
                      <div className={styles.twoGrid37}>
                        <div className={styles.reviewDate}>
                          {review.date ? review.date.split("T")[0] : ""}
                        </div>
                        <div>
                          <div
                            className={styles.reviewTW}
                            dangerouslySetInnerHTML={{
                              __html: review.title,
                            }}
                          />
                          <div className={styles.reviewEN}>{review.from}</div>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Arrow Up */}
        <div className={styles.mt45}>
          <div
            className={`${styles.arrowUp} ${styles.mt45} ${styles.pb20}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            role="button"
            tabIndex="0"
          >
            <img src="/ArrowUp_2.svg" alt="arrow-up" height="74px" />
          </div>
        </div>
      </div>
    </>
  );
}
