import { useInfiniteQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "../context/useYoutubeApi";
import { useEffect, useRef } from "react";
import VideoCard from "./VideoCard";
import VideoCardSkeleton from "./VideoCardSkeleton";
import { CgSpinner } from "react-icons/cg";

export default function PopularVideos() {
  const { youtube } = useYoutubeApi();
  const {
    isLoading, // 로딩되고 있는지
    data, // fetching해서 받아온 데이터
    error, // 에러 여부
    isFetchingNextPage, // nextPage로딩
    hasNextPage, // 다음 페이지가 있는지
    fetchNextPage, // 다음 페이지 가져오는 함수
  } = useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: ({ pageParam }) =>
      youtube.getMostPopularVideos(pageParam as string | undefined),

    initialPageParam: undefined as string | undefined, //required
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined, //required
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
          className="flex flex-col px-8 w-full gap-4 max-w-7xl mx-auto
    "
        >
          {data.pages.flatMap(
            // 배열의 각 요소에 주어진 콜백 함수를 적용한 배열을 반환
            // useInfiniteQuery가 관리하는 data 구조
            // {
            //   pages: [
            //     { items: [...], nextPageToken: "CAUQAA" },  // 1페이지
            //     { items: [...], nextPageToken: "CAUQBB" },  // 2페이지
            //     { items: [...], nextPageToken: undefined },  // 3페이지
            //   ],
            //   pageParams: [undefined, "CAUQAA", "CAUQBB"]
            // }
            (page) =>
              page.items.map((video) => (
                <VideoCard
                  key={video.id}
                  id={video.id}
                  channelId={video.snippet.channelId}
                  video={video}
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
