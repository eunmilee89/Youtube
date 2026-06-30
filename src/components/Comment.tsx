import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "../context/useYoutubeApi";
import { useEffect, useRef, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { LuAlignLeft, LuUserRound } from "react-icons/lu";
import FeedBackBtn from "./FeedBackBtn";
import DropdownMenuItem from "./DropdownMenuItem";
import CommentImageText from "./CommentImageText";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CommentInput from "./CommentInput";

type Props = {
  id: string;
};

export default function Comment({ id }: Props) {
  const { youtube } = useYoutubeApi();
  const observerRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [repliesOpen, setRepliesOpen] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comments", id],
      queryFn: ({ pageParam }) => youtube.getComments(id, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.nextPageToken,
      enabled: !!id,
    });

  const { data: video } = useQuery({
    queryKey: ["video", id],
    queryFn: () => youtube.getVideoById(id),
  });

  const comments = data?.pages.flatMap((page) => page.items) ?? [];

  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <div>로딩중</div>;

  return (
    <section>
      <div className="mb-6 flex items-center gap-5">
        <h2 className="text-xl font-semibold">
          댓글 {video?.statistics.commentCount}개
        </h2>
        <div className="relative">
          <FeedBackBtn
            icon={<LuAlignLeft />}
            text="정렬 기준"
            onClick={() => {
              setDropdownOpen((prev) => !prev);
            }}
            style="bg-transparent"
          />
          {dropdownOpen && (
            <div className="absolute left-0 top-11 bg-zinc-800 rounded-xl overflow-hidden z-50 min-w-80">
              <DropdownMenuItem
                text="인기순"
                subText="추천 댓글 표시"
                onClick={() => {}}
              />
              <DropdownMenuItem
                text="최신순"
                subText="스팸 가능성이 있는 댓글을 포함하여 최근 댓글 표시"
                onClick={() => {}}
              />
            </div>
          )}
        </div>
      </div>
      <div>
        {inputOpen || (
          <div className="flex gap-3 mb-7">
            <FeedBackBtn
              icon={<LuUserRound />}
              onClick={() => {}}
              style={"w-9 h-9 bg-zinc-800"}
              iconSize="text-xl"
            />
            <div
              className="border-b-1 border-zinc-700 w-full text-sm text-zinc-400 self-center py-2"
              onClick={() => {
                setInputOpen((prev) => !prev);
              }}
            >
              댓글 추가...
            </div>
          </div>
        )}

        {/* TODO: 댓글 인풋 컴포넌트 추가 */}
        {inputOpen && <CommentInput closeInput={() => setInputOpen(false)} />}
      </div>
      {comments.map((thread) => (
        <div key={thread.id}>
          <CommentImageText
            snippet={thread.snippet.topLevelComment.snippet}
            id={thread.id}
          />
          <div className="ml-8">
            {repliesOpen &&
              thread.replies?.comments.map((reply) => (
                <div key={reply.id}>
                  <CommentImageText
                    snippet={reply.snippet}
                    id={reply.id}
                    style="ml-4"
                  />
                </div>
              ))}

            {thread.replies && (
              <FeedBackBtn
                icon={repliesOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                text={
                  repliesOpen
                    ? "답글 숨기기"
                    : `답글 ${thread.replies.comments.length}개`
                }
                onClick={() => setRepliesOpen((prev) => !prev)}
                style="w-fit mb-6"
              />
            )}
          </div>
        </div>
      ))}
      <div ref={observerRef} className="h-1" />
      {isFetchingNextPage && (
        <div className="flex justify-center mt-4">
          <CgSpinner className="animate-spin w-8 h-8 text-zinc-400" />
        </div>
      )}
    </section>
  );
}
