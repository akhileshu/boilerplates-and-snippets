"use client";

import { useEffect, useState } from "react";
import { Announcement } from "./types";
import { withErrorLogging } from "@/lib/error-handler/withErrorLogging";

const STORAGE_KEY = "seenBanners";

function SiteBanner() {
  const [banner, setBanner] = useState<Announcement | null>(null);

  useEffect(() => {
    // useeffect iffe
    (async () => {
      const [announcements, error] = await withErrorLogging(
        async () => {
          const res = await fetch("/announcements.json");
          return (await res.json()) as Announcement[];
        },
        {
          source: "useAnnouncementsBanner",
          area: "DATA_RENDERING",
          something: "else",
        }
      );

      if (!announcements || error) return;

      const seen = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

      const toShow = announcements.find(
        (a) =>
          !seen.includes(a.tag) &&
          (!a.showOn || new Date(a.showOn) <= new Date()) &&
          (!a.expiresOn || new Date(a.expiresOn) >= new Date())
      );

      if (toShow) setBanner(toShow);
    })();
  }, []);

  const dismiss = () => {
    const seen = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    seen.push(banner?.tag);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seen));
    setBanner(null);
  };

  if (!banner) return null;

  return (
    <div
      className={`bg-${
        banner.type === "warning" ? "yellow" : "blue"
      }-100 fixed top-0 left-0 w-[calc(100%-1rem)] z-[1000] bg-blue-100 shadow-md p-2 rounded-md m-2`}
    >
      <p className="text-sm">
        {banner.text}
        {banner.link && (
          <a href={banner.link} className="underline ml-2">
            Learn more
          </a>
        )}
      </p>
      <button onClick={dismiss} className="ml-4 text-xs">
        Dismiss
      </button>
    </div>
  );
}

export default function BannerWrapper() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;
  if (process.env.NODE_ENV === "development") return null;
  return <SiteBanner />;
}
