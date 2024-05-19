import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { IoMdArrowDropdown } from "react-icons/io";
import { getIssues } from "../../hooks/useGetIssues";

const LabelPopover = ({ trigger }: { trigger: string }) => {
  const [query, setQuery] = useState("");
  const { user } = useParams<{ user: string }>();

  const { data, isFetching } = useQuery({
    queryKey: ["issues"],
    queryFn: () => getIssues({ query: "/facebook/react/issues" }),
    staleTime: 1000 * 60 * 5,
  });
  console.log(data);
  const formatLabels = [
    ...new Map(
      data.flatMap((issue) => issue.labels.map((label) => [label.id, label]))
    ).values(),
  ];

  return (
    <Popover.Root>
      <Popover.Trigger className="flex items-center gap-1">
        {trigger} <IoMdArrowDropdown />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-72 bg-white shadow-lg rounded-md border-[1px] border-porcelain-300"
          sideOffset={5}
        >
          <div className="py-2 px-3 text-xs border-b-[1px] border-b-porcelain-200">
            Filter by label
          </div>
          <div className="p-2">
            <input
              type="text"
              className="text-sm border-[1px] border-porcelain-200 w-full px-2 py-1 rounded-md"
              placeholder="Filter labels"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="w-full flex items-center py-2 flex-col max-h-64 overflow-y-auto">
            {isFetching ? (
              <div className="text-center">Loading...</div>
            ) : (
              formatLabels
                ?.filter((info) =>
                  info.name.toLowerCase().includes(query.toLowerCase())
                )
                .map((label) => (
                  <Link
                    href="#"
                    onClick={() => handleLabelClick()}
                    key={label?.id}
                    className="w-full flex items-center gap-2 py-2 px-6 border-t-[1px] border-t-porcelain-200 hover:bg-porcelain-100 relative"
                  >
                    <div
                      className="w-4 h-4 rounded-full border-[1px] border-porcelain-200 opacity-50"
                      style={{
                        background: `#${label.color}`,
                      }}
                    ></div>
                    <b className="text-xs">{label?.name}</b>
                  </Link>
                ))
            )}
          </div>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default LabelPopover;
