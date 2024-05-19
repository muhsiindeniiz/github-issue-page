import { PropsWithChildren } from "react";
import { IssueType } from "../../pages/issue-page/issues-page.type";

export type IssuesPageProps = PropsWithChildren & {
    data?: IssueType[]
};
