import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { fetchAuthors } from "../../hooks/useGetUser";

const AuthorPopover = ({ trigger }: { trigger: string }) => {
  const [query, setQuery] = useState("");
  const { user } = useParams<{ user: string }>();

  const { data: authors, isFetching } = useQuery({
    queryKey: ["authors"],
    queryFn: () => fetchAuthors({ query: `?per_page=1000&state=open` }),
    staleTime: 1000 * 60 * 5,
  });

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
            Filter by author
          </div>
          <div className="p-2">
            <input
              type="text"
              className="text-sm border-[1px] border-porcelain-200 w-full px-2 py-1 rounded-md"
              placeholder="Filter users"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="w-full flex items-center py-2 flex-col max-h-64 overflow-y-auto">
            {isFetching ? (
              <div className="text-center">Loading...</div>
            ) : (
              authors &&
              authors
                ?.filter((info) =>
                  info.login.toLowerCase().includes(query.toLowerCase())
                )
                .map((author) => (
                  <Link
                    href={`/authors/${author?.login}`}
                    key={author?.id}
                    className="w-full flex items-center gap-2 py-1 px-6 border-t-[1px] border-t-porcelain-200 hover:bg-porcelain-100 relative"
                  >
                    {user &&
                      user.toLowerCase() == author?.login.toLowerCase() && (
                        <div className="absolute left-2">
                          <IoCheckmark />
                        </div>
                      )}
                    <Image
                      src={author?.avatar_url}
                      width={20}
                      height={20}
                      alt={`@${author?.login}`}
                    />
                    <b className="text-xs">{author?.login}</b>
                    <span className="text-xs">
                      {author?.name?.slice(0, 15)}
                    </span>
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

export default AuthorPopover;
