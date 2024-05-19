import React, { FC } from "react";
import type { RootHtmlProps } from "./root-html.type";

const RootHtml: FC<RootHtmlProps> = (props) => {
  const { children } = props;

  return <html>{children}</html>;
};

export default RootHtml;
