import { useInfiniteQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "../../hooks/useYoutubeApi";
import { useEffect, useRef } from "react";
import VideoCardSkeleton from "./VideoCardSkeleton";
import { CgSpinner } from "react-icons/cg";
import RelatedVideoCard from "../common/RelatedVideoCard.";

export default function PopularVideos() {
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    data,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: ({ pageParam }) =>
      youtube.getMostPopularVideos(pageParam as string | undefined),

    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      {isLoading && (
        <ul className="flex flex-col px-8 w-full gap-4 max-w-7xl mx-auto">
          {Array.from({ length: 10 }).map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))}
        </ul>
      )}
      {error && <p>Something is wrong...</p>}
      {data && (
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-[1441px]:grid-cols-4 gap-4 px-8 w-full mx-auto
    "
        >
          {data.pages.flatMap((page) =>
            page.items.map((video) => (
              <RelatedVideoCard
                key={video.id}
                id={video.id}
                channelId={video.snippet.channelId}
                video={video}
                variant="vertical"
              />
            )),
          )}
        </ul>
      )}
      <div ref={bottomRef} className="h-4" />
      {isFetchingNextPage && (
        <div className="flex justify-center mt-4">
          <CgSpinner className="animate-spin w-8 h-8 text-zinc-400" />
        </div>
      )}
    </div>
  );
}
