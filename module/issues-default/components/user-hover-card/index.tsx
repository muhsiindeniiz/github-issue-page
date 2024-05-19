import React, { useEffect } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { IoLogoTwitter } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { getUser } from "../../hooks/useGetUser";

const UserHoverCard = ({
  trigger,
  username,
}: {
  trigger: React.ReactNode;
  username: string;
}) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUser({ query: username }),
    staleTime: 1000 * 60 * 5,
    enabled: !!username,
  });

  useEffect(() => {
    if (username) {
      refetch();
    }
  }, [username, refetch]);

  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>{trigger}</HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="bg-white shadow-xl rounded-lg max-w-sm border-porcelain-400 border-[1px] p-4"
          sideOffset={5}
        >
          {isFetching ? (
            <div>Loading...</div>
          ) : (
            data && (
              <div className="flex flex-col gap-4">
                <Link href={data?.html_url} target="_blank">
                  <Image
                    className="Image large"
                    src={data?.avatar_url}
                    alt={data?.login}
                    width={36}
                    height={36}
                  />
                </Link>
                <div className="flex flex-col gap-2">
                  <Link
                    href={data?.html_url}
                    className="flex items-center gap-2"
                  >
                    <div className="font-bold text-sm">{data?.login}</div>

                    <div className="text-porcelain-500 text-sm">
                      {data?.name}
                    </div>
                  </Link>
                  <div className="text-sm">{data?.bio}</div>
                  {data?.location && (
                    <div className="flex items-center gap-1">
                      <SlLocationPin /> {data?.location}
                    </div>
                  )}
                  {data?.company && (
                    <div className="flex items-center gap-1">
                      <HiOutlineOfficeBuilding /> {data?.company}
                    </div>
                  )}
                  {data?.email && (
                    <div className="flex items-center gap-1">
                      <MdOutlineMail /> {data?.email}
                    </div>
                  )}
                  {data?.twitter_username && (
                    <div className="flex items-center gap-1">
                      <IoLogoTwitter /> {data?.twitter_username}
                    </div>
                  )}
                </div>
              </div>
            )
          )}
          <HoverCard.Arrow className="HoverCardArrow" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default UserHoverCard;
