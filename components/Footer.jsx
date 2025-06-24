"use client";

import Image from "next/image";
import styles from "./footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return <div className={styles.footer}>© {year} Hong Foundation</div>;
}
