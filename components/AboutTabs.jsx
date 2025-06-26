"use client";

import styles from "./aboutTabs.module.css";

import { useState } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

import Link from "next/link";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2, color: "#fff", marginTop: 6 }}>{children}</Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: "calc(100% - 32px)",
    width: "100%",
    backgroundColor: "#e77832",
  },
  "& .MuiTabs-root": {
    transform: "rotate(90deg) translateY(-100%)",
    transformOrigin: `top left`,
    width: "100dvh",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: 600,
    marginRight: theme.spacing(5),
    color: "#fff",
    fontSize: "16px",
    letterSpacing: "0.16em",
    lineHeight: "25px",
    fontFamily: "metropolis",
    "&.Mui-selected": {
      color: "#e77832",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#e77832",
    },
    "&:hover": {
      color: "#e77832",
      opacity: 1,
    },
    "&.MuiTab-root": {
      minWidth: "unset",
    },
  })
);

export default function AboutTabs({ about }) {
  //   console.log("about:", about);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Sort timelines by year (ascending)
  const sortedTimelines = about.timelines
    ? [...about.timelines].sort((a, b) => {
        // Extract year as number for comparison
        const yearA =
          typeof a.year === "string"
            ? parseInt(a.year.slice(0, 4), 10)
            : a.year;
        const yearB =
          typeof b.year === "string"
            ? parseInt(b.year.slice(0, 4), 10)
            : b.year;
        return yearA - yearB;
      })
    : [];

  return (
    <div className={styles.aboutMenuBlock}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <Box sx={{ borderBottom: 0 }}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="abiut tabs"
            textColor="primary"
            indicatorColor="secondary"
            // variant="fullWidth"
            className={styles.aboutTabsRoot}
          >
            <StyledTab label="ABOUT" {...a11yProps(0)} />
            <StyledTab label="TIMELINE" {...a11yProps(1)} />
            <StyledTab label="REVIEW" {...a11yProps(2)} />
            <StyledTab label="INFO" {...a11yProps(3)} />
          </StyledTabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className={styles.tabContainer}>
            <div
              className={`${styles.aboutContent} ${styles.tw}`}
              dangerouslySetInnerHTML={{ __html: about.content_zh_hant_tw }}
            />
            <div
              className={`${styles.aboutContent} ${styles.en}`}
              dangerouslySetInnerHTML={{ __html: about.content_en_us }}
            />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className={styles.tabContainer}>
            <div>
              {sortedTimelines.length > 0 && (
                <div>
                  {sortedTimelines.map((node) => (
                    <div key={node.year} className={styles.timelineAllBlock}>
                      {node.status === "draft" && <span></span>}
                      {node.status === "published" && (
                        <div>
                          <div className={styles.timelineYear}>
                            {/* Format year */}
                            {node.year && typeof node.year === "string"
                              ? node.year.slice(0, 4)
                              : node.year}
                          </div>
                          <div className={styles.timelineContentBlock}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: node.title_zh_hant_tw,
                              }}
                              className={styles.timelineContentTW}
                            />
                            <div
                              dangerouslySetInnerHTML={{
                                __html: node.title_en_us,
                              }}
                              className={styles.timelineContentEN}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div className={styles.tabContainer}>
            {about.reviews && (
              <div>
                {about.reviews.map((review) => (
                  <div key={review.id}>
                    {review.status === "draft" && <span></span>}
                    {review.status === "published" && (
                      <Link href={`/about/review`}>
                        <>
                          <div
                            className={styles.reviewTitle}
                            dangerouslySetInnerHTML={{
                              __html: review.title,
                            }}
                          />
                          <div className={styles.reviewFD}>
                            <span>{review.from}</span>
                            <span> | </span>
                            <span>
                              {review.date ? review.date.slice(0, 10) : ""}
                            </span>
                          </div>
                          <div
                            className={styles.arrowGoTo}
                            role="button"
                            tabIndex="0"
                          >
                            <img
                              src="/ArrowRight_2.svg"
                              alt="internal link button"
                              width={60}
                              height={60}
                            />
                          </div>
                        </>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <div className={styles.tabContainer}>
            <div
              className={styles.infoContent}
              dangerouslySetInnerHTML={{
                __html: about.info,
              }}
            />
            <div className={styles.socialMediaBlk}>
              <span
                className={`${styles.socialMedia} ${styles.FB}`}
                role="button"
                tabIndex="0"
              >
                <a href={about.fb} target="_blank" rel="noreferrer">
                  <img src="/fb.svg" alt="link to FB" />
                </a>
              </span>
              <span
                className={`${styles.socialMedia} ${styles.YT}`}
                role="button"
                tabIndex="0"
              >
                <a href={about.yt} target="_blank" rel="noreferrer">
                  <img src="/yt.svg" alt="link to YT" />
                </a>
              </span>
              <span
                className={`${styles.socialMedia} ${styles.IG}`}
                role="button"
                tabIndex="0"
              >
                <a href={about.ig} target="_blank" rel="noreferrer">
                  <img src="/ig.svg" alt="link to IG" />
                </a>
              </span>
            </div>
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  );
}
