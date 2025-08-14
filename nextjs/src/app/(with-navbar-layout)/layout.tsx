import { PropsWithChildren } from "react";
import Navbar from "../_components/navbar";
import BannerWrapper from "../_components/site-banner";

export default async function WithLayout({ children }: PropsWithChildren) {
  return (
    <>
      <BannerWrapper />
      <Navbar />
      <div className="mt-16">{children}</div>
    </>
  );
}
