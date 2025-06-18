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
  //   const [checked, setChecked] = useState(false);

  //   const handleChange = () => {
  //     setChecked((prev) => !prev);
  //   };
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
              {pages.map((page) => (
                <div key={page.id} className={styles.navTitle}>
                  <Link href={`/${page.slug}`} onClick={closeNav}>
                    <div className={styles.navTitleEN}>
                      {page.menu_text_en_us}
                    </div>
                    <div className={styles.navTitleTW}>
                      {page.menu_text_zh_hant_tw}
                    </div>
                  </Link>
                </div>
              ))}
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
