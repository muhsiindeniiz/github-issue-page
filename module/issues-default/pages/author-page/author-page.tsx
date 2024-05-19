"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import IssuesListTable from "../../components/issues-list-table";
import { getIssues } from "../../hooks/useGetIssues";
import { IssueType } from "../issue-page/issues-page.type";

const AuthorPage = () => {
  const { user } = useParams<{ user: string }>();

  const { data, isFetching, error } = useQuery({
    queryKey: ["issues"],
    queryFn: () => getIssues({ query: "/facebook/react/issues" }),
    staleTime: 1000 * 60 * 5,
  });

  const filteredData = data?.filter(
    (issue: IssueType) => issue.user.login.toLowerCase() == user.toLowerCase()
  );

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="w-full overflow-x-hidden overflow-y-auto">
      <div className="w-full justify-center">
        <div className="container m-auto">
          <div className="mb-3 mt-5">
            <Link href="/">Clear Filter</Link>
          </div>
          <IssuesListTable data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
