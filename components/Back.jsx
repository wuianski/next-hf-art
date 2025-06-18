"use client";

import Image from "next/image";
import styles from "./back.module.css";

export default function Back() {
  return (
    <div>
      <div className={styles.reviewPage}>
        <div className={styles.btmLine}>
          <a
            onClick={() => window.history.back()}
            onKeyDown={() => window.history.back()}
            role="button"
            tabIndex="0"
          >
            <div className={styles.backBtn}>
              <Image
                src="/ArrowLeft_2.svg"
                alt="back button"
                width={60}
                height={60}
              />
              <span className={styles.backText}>back</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
