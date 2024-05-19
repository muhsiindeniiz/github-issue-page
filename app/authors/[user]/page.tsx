import React, { Suspense } from "react";
import AuthorPage from "@/module/issues-default/pages/author-page/author-page";
import Loading from "@/package/components/loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthorPage />
    </Suspense>
  );
}
