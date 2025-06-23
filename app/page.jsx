import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import { readItems } from "@directus/sdk";
import styles from "./home.module.css";
import Image from "next/image";
import Link from "next/link";

/* COMPONENTS */
import FrontPage from "@/components/FrontPage";

async function getPages() {
  try {
    return await directus.request(
      readItems("pages", {
        sort: ["sort"],
        fields: ["*", "*.*", { file: ["*", "*.*"] }],
        filter: {
          _and: [
            // {
            //   status: {
            //     _eq: "published",
            //   },
            // },
            {
              id: {
                _nin: [3, 4],
              },
            },
          ],
        },
      })
    );
  } catch (error) {
    notFound();
  }
}

export const metadata = {
  title: "Home | Hong Foundation - Art",
  description: "Home | Hong Foundation - Art",
};

export default async function HomePage() {
  const pages = await getPages();
  //   console.log("pages:", pages);
  return (
    <>
      <FrontPage pages={pages} />
    </>
  );
}
