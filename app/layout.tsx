import React from "react";
import type { Metadata } from "next";
import "@/package/assets/style/global.scss";
import { RootBody, RootHtml } from "@/package/provider";

export const metadata: Metadata = {
  title: "Github Issue Page",
  description: "Best Issue Page Structure with Muhsin Deniz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootHtml>
      <RootBody>
        <main>{children}</main>
      </RootBody>
    </RootHtml>
  );
}
