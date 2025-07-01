"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import styles from "./nav.module.css";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";

// use menu-open svg in default, when the menu is open, show page.menu_text_en_us, and use menu-close svg
export default function Nav({ pages }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeNav = () => {
    setMenuOpen((open) => !open);
  };
  return (
    <nav>
      <div
        onClick={() => {
          setMenuOpen((open) => !open);
        }}
        id={styles.menuButton}
      >
        {menuOpen ? (
          <Image
            src="/menu-close.svg"
            alt="Menu Close"
            width={30}
            height={30}
          />
        ) : (
          <Image src="/menu-open.svg" alt="Menu Open" width={30} height={30} />
        )}
      </div>

      {menuOpen && (
        <Slide direction="right" in={menuOpen} mountOnEnter unmountOnExit>
          <div id={styles.menuContainer}>
            <div
              id={styles.menuClose}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Image
                src="/menu-close.svg"
                alt="Menu Close"
                width={30}
                height={30}
              />
            </div>

            <div id={styles.logoContainer}>
              <a
                href="https://hongfoundation.org.tw/"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/logo_hf_dark.svg"
                  alt="Hong Foundation Logo"
                  width={120}
                  height={210}
                />
              </a>
            </div>

            <div id={styles.navContainer}>
              <div className={styles.navTitle}></div>
              <div className={styles.navTitle}>
                <Link href="/tung-chung-prize" onClick={closeNav}>
                  <div className={styles.navTitleEN}>TUNG CHUNG PRIZE</div>
                  <div className={styles.navTitleTW}>銅鐘藝術賞</div>
                </Link>
              </div>
              <div className={styles.navTitle}>
                <Link href="/the-question" onClick={closeNav}>
                  <div className={styles.navTitleEN}>The Question Project</div>
                  <div className={styles.navTitleTW}>問問題計畫</div>
                </Link>
              </div>
              <div className={styles.navTitle}>
                <Link href="/extension" onClick={closeNav}>
                  <div className={styles.navTitleEN}>Extension Project</div>
                  <div className={styles.navTitleTW}>認養計畫</div>
                </Link>
              </div>
              <div className={styles.navTitle}>
                <Link href="/canopy" onClick={closeNav}>
                  <div className={styles.navTitleEN}>Canopy Project</div>
                  <div className={styles.navTitleTW}>雨棚計畫</div>
                </Link>
              </div>
              <div className={styles.navTitle}>
                <Link href="/collaborations" onClick={closeNav}>
                  <div className={styles.navTitleEN}>collaborations</div>
                  <div className={styles.navTitleTW}>特別合作</div>
                </Link>
              </div>

              <div className={styles.navTitleS}>
                <Link href="/" onClick={closeNav}>
                  <div className={styles.navTitleEN}>Home</div>
                </Link>
                <Link href="/about" onClick={closeNav}>
                  <div className={styles.navTitleEN}>About</div>
                </Link>
                <Link href="/hong-x-panasonic" onClick={closeNav}>
                  <div className={styles.navTitleEN}>HONG X PANASONIC</div>
                </Link>
                <Link href="/press" onClick={closeNav}>
                  <div className={styles.navTitleEN}>Press</div>
                </Link>
              </div>
            </div>
          </div>
        </Slide>
      )}
    </nav>
  );
}
