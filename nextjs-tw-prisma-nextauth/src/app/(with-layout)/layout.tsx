import { PropsWithChildren } from "react";
import Navbar from "./_components/navbar";

export default function WithLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
