"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import styles from "@/app/home.module.css";

import Slider from "react-slick";
import { Fade } from "react-awesome-reveal";

/* Slick Carousel Settings */
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function FrontPage({ pages }) {
  return (
    <>
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
                    >
                      <Image
                        src={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${page.cover.filename_disk}`}
                        alt={page.cover.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                        quality={100}
                        style={{
                          objectFit: "cover",
                        }}
                        placeholder="blur"
                        blurDataURL={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${page.cover.filename_disk}?blur=100`}
                      />
                    </div>

                    <div className={styles.blcCtr}>
                      <Fade cascade delay={500} duration={2000} damping={0.1}>
                        <div>
                          <p className={styles[`fullPName${page.sort}`]}>
                            {page.menu_text_en_us}
                          </p>
                        </div>
                        <div>
                          <p className={styles[`fullPNameTW${page.sort}`]}>
                            {page.menu_text_zh_hant_tw}
                          </p>
                        </div>
                      </Fade>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div id={styles.project_container_m}>
          <Slider {...settings}>
            {pages.map((page, index) => (
              <div key={index}>
                <Link href={`/${page.slug}`}>
                  <div
                    style={{
                      position: "relative",
                      width: "100dvw",
                      height: "100dvh",
                      backgroundColor: "#000",
                    }}
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
                    />
                    <Fade cascade delay={500} duration={2000} damping={0.5}>
                      <div className={styles.blcCtr}>
                        <p className={styles.tagName_m}>{page.tag_name}</p>
                        <p className={styles.fullPName}>
                          {page.menu_text_en_us}
                        </p>
                        <p className={styles.fullPNameTW}>
                          {page.menu_text_zh_hant_tw}
                        </p>
                      </div>
                    </Fade>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
