"use client";
import { FC } from "react";
import { twMerge } from "tailwind-merge";
import type { RootBodyProps } from "./root-body.type";

const RootBody: FC<RootBodyProps> = (props) => {
  const { children } = props;

  const style = twMerge("h-screen w-screen overflow-hidden");

  return <body className={style}>{children}</body>;
};

export default RootBody;
