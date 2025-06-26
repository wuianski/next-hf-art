import "./global.css";
import localFont from "next/font/local";

/* DIRECTUS */
import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import { readItems } from "@directus/sdk";
/* COMPONENTS */
import Nav from "@/components/Nav";
import Logo from "@/components/Logo";

/* MUI */
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
/* SLICK CAROUSEL */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Template from "./template";

/* FONTS */
const metropolis = localFont({
  src: [
    {
      path: "./fonts/Metropolis-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Metropolis-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Metropolis-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Metropolis-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Metropolis-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
  ],
});

const noto_sans_jp = localFont({
  src: [
    {
      path: "./fonts/NotoSansJP-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/NotoSansJP-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/NotoSansJP-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/NotoSansJP-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/NotoSansJP-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
});
/* DIRECTUS */
async function getPages() {
  try {
    return await directus.request(
      readItems("pages", {
        fields: ["*", "*.*", { file: ["*", "*.*"] }],
        filter: {
          sort: {
            _in: [1, 2, 3, 4], // Exclude the pages with sort 5 and 6
          },
        },
        sort: ["sort"],
      })
    );
  } catch (error) {
    notFound();
  }
}

export const metadata = {
  title: "Hong Foundation - Art",
  description: "Hong Foundation - Art",
};

export default async function RootLayout({ children }) {
  const pages = await getPages();
  // console.log("pages:", pages);
  return (
    <html
      lang="en"
      className={`${noto_sans_jp.className} ${metropolis.className}`}
    >
      <body>
        <AppRouterCacheProvider>
          <Logo />
          <Nav pages={pages} />
          <div>
            <Template>{children}</Template>
            {/* {children} */}
          </div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
