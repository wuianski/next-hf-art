"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Logo() {
  const pathname = usePathname();

  const light_logo = pathname === "/" || pathname === "/about";
  const logoSrc = light_logo ? "/logo_hf.svg" : "/logo_hf_dark.svg";

  let projectPageTagName = null;
  if (pathname === "/the-question") {
    projectPageTagName = "commission";
  } else if (pathname === "/extension") {
    projectPageTagName = "sponsorship";
  } else if (pathname === "/tung-chung-prize") {
    projectPageTagName = "prize";
  } else if (pathname === "/canopy") {
    projectPageTagName = "open call";
  } else {
    projectPageTagName = null;
  }

  // Determine zIndex based on pathname
  const logoZIndex = pathname === "/" || pathname.includes("review") ? 1 : 1;
  const tagZIndex = pathname === "/" ? 1 : -1;

  return (
    <>
      <a href="https://hongfoundation.org.tw/" target="_blank" rel="noreferrer">
        <Image
          priority
          src={logoSrc}
          alt="Hong Foundation Logo"
          width={120}
          height={210}
          style={{
            position: "fixed",
            top: 14,
            left: 0,
            zIndex: logoZIndex,
          }}
        />
      </a>
      <div
        style={{
          color: `#e77832`,
          display: "inline-block",
          transform: `rotate(90deg)`,
          fontSize: `15px`,
          fontWeight: 700,
          letterSpacing: `0.2em`,
          textTransform: `uppercase`,
          position: `fixed`,
          left: "0px",
          top: "68px",
          width: "150px",
          height: "100px",
          fontFamily: "metropolis",
          zIndex: tagZIndex,
        }}
      >
        {projectPageTagName}
      </div>
    </>
  );
}
