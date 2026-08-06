import { useInfiniteQuery } from "@tanstack/react-query";
import VideoCard from "../common/VideoCard";
import { useYoutubeApi } from "../../hooks/useYoutubeApi";
import type {
  SearchResponse,
  VideoResponse,
  SearchResultItem,
  VideoItem,
} from "../../../public/types/youtube";
import { useEffect, useRef } from "react";
import { CgSpinner } from "react-icons/cg";
import VideoCardSkeleton from "./VideoCardSkeleton";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import RelatedVideoCard from "../common/RelatedVideoCard.";

interface Props {
  keyword?: string;
  component?: "default" | "RelatedVideoCard";
}

// id가 객체면 SearchResultItem, 문자열이면 VideoItem
function isSearchResultItem(
  item: SearchResultItem | VideoItem,
): item is SearchResultItem {
  return typeof item.id === "object";
}

export default function SearchResult({
  keyword,
  component = "default",
}: Props) {
  const isRow = useMediaQuery("(min-width: 1024px)");
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    data,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<SearchResponse | VideoResponse>({
    queryKey: keyword ? ["videos", keyword] : ["popularVideos"],
    queryFn: ({ pageParam }) =>
      keyword
        ? youtube.searchByKeyword(keyword, pageParam as string | undefined)
        : youtube.getMostPopularVideos(pageParam as string | undefined),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isRow) return;
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
    <div className="mx-auto">
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
          className={` ${component === "RelatedVideoCard" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-col px-0 lg:px-8" : "flex flex-col px-8"} w-full gap-4 max-w-7xl mx-auto
`}
        >
          {data.pages.flatMap((page) =>
            page.items.map((video) => {
              const videoId = isSearchResultItem(video)
                ? video.id.videoId
                : video.id;

              return component === "default" ? (
                <VideoCard
                  key={videoId}
                  id={videoId}
                  channelId={video.snippet.channelId}
                  video={video}
                  keyword={keyword}
                />
              ) : (
                <RelatedVideoCard
                  key={videoId}
                  id={videoId}
                  channelId={video.snippet.channelId}
                  video={video}
                  keyword={keyword}
                  variant="horizontal"
                  image={false}
                />
              );
            }),
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
