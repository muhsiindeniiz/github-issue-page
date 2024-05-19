import React, { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import Link from "next/link";
import { GoIssueOpened } from "react-icons/go";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoChatboxOutline } from "react-icons/io5";
import UserHoverCard from "@/module/issues-default/components/user-hover-card";
import DateDifference from "@/package/util/date-difference";
import { IssueType } from "../../pages/issue-page/issues-page.type";
import AuthorPopover from "../author-popover";
import LabelPopover from "../label-popover";

const IssuesListTable = ({ data }: { data: IssueType[] }) => {
  const columns = useMemo<ColumnDef<IssueType, string>[]>(
    () => [
      {
        accessorKey: "id",
        header: () => (
          <div className="flex items-center gap-2 text-md font-bold">
            <GoIssueOpened />
            {data.length} Open
          </div>
        ),
        cell: (info) => (
          <div className="w-full">
            <div className="font-bold">{info?.row.original.title}</div>
            <div className="flex items-center gap-2">
              {info.row.original.labels.map((label) => {
                const labelUrl = `?q=${label.url.split("/labels/")[1]}`;
                return (
                  <Link
                    href={labelUrl}
                    rel="noopener noreferrer"
                    key={label.id}
                    style={{
                      background: `#${label.color}`,
                    }}
                    className="px-2 rounded-xl text-xs text-white"
                  >
                    {label.name}
                  </Link>
                );
              })}
            </div>
            <div className="flex gap-1 text-xs mt-2">
              <div>#{info.row.original.number} </div>
              <div className="flex gap-2">
                opened <DateDifference date={info.row.original.created_at} />{" "}
                days ago by
              </div>{" "}
              <UserHoverCard
                trigger={
                  <div className="cursor-pointer hover:text-porcelain-500 font-semibold">
                    {info.row.original.user?.login}
                  </div>
                }
                username={info.row.original.user?.login}
              />
            </div>
          </div>
        ),
        size: 900,
      },
      {
        accessorKey: "comments",
        header: () => (
          <div className="flex items-center gap-10">
            <div className="flex items-center">
              <AuthorPopover trigger="Author" />
            </div>
            <div className="flex items-center">
              <LabelPopover trigger="Label" />
            </div>
            <div className="flex items-center">
              Projects <IoMdArrowDropdown />
            </div>
            <div className="flex items-center">
              Milestones <IoMdArrowDropdown />
            </div>
            <div className="flex items-center">
              Assignee <IoMdArrowDropdown />
            </div>
            <div className="flex items-center">
              Sort <IoMdArrowDropdown />
            </div>
          </div>
        ),
        cell: (info) => (
          <Link
            className="flex cursor-pointer items-center gap-1 text-porcelain-800 font-semibold"
            href={`https://github.com/facebook/react/issues/${info.row.original.number}`}
          >
            <IoChatboxOutline />
            {info?.row.original.comments}
          </Link>
        ),
      },
    ],
    [data.length]
  );

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col">
      <table className="bg-porcelain-100 rounded-t-lg">
        <thead className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-b-[1px] border-b-porcelain-300"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 pr-2 py-4 font-medium text-left"
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex min-w-[36px]">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 pt-[14px] pb-[18px]">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex sm:flex-row flex-col w-full mt-8 items-center gap-2 text-xs">
        <div className="flex gap-2">
          <button
            className={`${
              !table.getCanPreviousPage()
                ? "bg-bg-white"
                : "hover:bg-gray-200 hover:cursor-pointer bg-bg-white"
            } rounded p-1`}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="w-5 h-5">{"<<"}</span>
          </button>
          <button
            className={`${
              !table.getCanPreviousPage()
                ? "bg-bg-white"
                : "hover:bg-gray-200 hover:cursor-pointer bg-bg-white"
            } rounded p-1`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="w-5 h-5">{"<"}</span>
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`${
                number === currentPage
                  ? "bg-porcelain-500 text-white"
                  : "bg-white"
              } border rounded p-1`}
              onClick={() => table.setPageIndex(number - 1)}
            >
              {number}
            </button>
          ))}
          <button
            className={`${
              !table.getCanNextPage()
                ? "bg-bg-white"
                : "hover:bg-gray-200 hover:cursor-pointer bg-white"
            } rounded p-1`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="w-5 h-5">{">"}</span>
          </button>
          <button
            className={`${
              !table.getCanNextPage()
                ? "bg-bg-white"
                : "hover:bg-gray-200 hover:cursor-pointer bg-bg-white"
            } rounded p-1`}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="w-5 h-5">{">>"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssuesListTable;
