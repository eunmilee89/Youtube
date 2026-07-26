import { useInfiniteQuery } from "@tanstack/react-query";
import VideoCard from "../common/VideoCard";
import { useYoutubeApi } from "../../hooks/useYoutubeApi";
import type { SearchResponse } from "../../../public/types/youtube";
import { useEffect, useRef } from "react";
import { CgSpinner } from "react-icons/cg";
import VideoCardSkeleton from "./VideoCardSkeleton";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import RelatedVideoCard from "../common/RelatedVideoCard.";

interface Props {
  keyword: string;
  component?: "default" | "RelatedVideoCard";
}

export default function SearchResult({
  keyword,
  component = "default",
}: Props) {
  const isRow = useMediaQuery("(min-width: 1024px)");
  const { youtube } = useYoutubeApi();
  const {
    isLoading, // 로딩되고 있는지
    data, // fetching해서 받아온 데이터
    error, // 에러 여부
    isFetchingNextPage, // nextPage로딩
    hasNextPage, // 다음 페이지가 있는지
    fetchNextPage, // 다음 페이지 가져오는 함수
  } = useInfiniteQuery<SearchResponse>({
    queryKey: ["videos", keyword],
    queryFn: ({ pageParam }) =>
      youtube.searchByKeyword(keyword, pageParam as string | undefined),
    initialPageParam: undefined, //required
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined, //required
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isRow) return;
    const observer = new IntersectionObserver( // 사용자가 페이지 바닥에 도달했는지 감지
      (entries) => {
        // 인스턴스의 배열
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage(); // isIntersecting은 현재 관찰 대상이 현재 루트안에 포함되있는지
        }
      },
      { threshold: 0.1 }, // 타겟이 10% 보여졌을 때 옵저버가 실행됨, 기본값 0
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
            page.items.map((video) =>
              component === "default" ? (
                <VideoCard
                  key={video.id.videoId}
                  id={video.id.videoId}
                  channelId={video.snippet.channelId}
                  video={video}
                  keyword={keyword}
                />
              ) : (
                <RelatedVideoCard
                  key={video.id.videoId}
                  id={video.id.videoId}
                  channelId={video.snippet.channelId}
                  video={video}
                  keyword={keyword}
                  variant="horizontal"
                  image={false}
                />
              ),
            ),
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
