import { useQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "../context/useYoutubeApi";
import { formatCount } from "../util/formatCount";
import { useNavigate } from "react-router";
import FeedBackBtn from "./FeedBackBtn";
import { LuThumbsDown, LuThumbsUp } from "react-icons/lu";
import { TbShare3 } from "react-icons/tb";
import { MdMoreHoriz, MdOutlineBookmarkBorder } from "react-icons/md";
import { RiDownloadLine, RiGeminiFill } from "react-icons/ri";
import { useRef, useState, useEffect } from "react";
import { FiFlag } from "react-icons/fi";
import DropdownMenuItem from "./DropdownMenuItem";
import { formatAgo } from "../util/date";
import ChannelSubscriber from "./ChannelSubscriber";
import { GoVideo } from "react-icons/go";
import { BsPersonSquare } from "react-icons/bs";
import { VscThumbsdownFilled, VscThumbsupFilled } from "react-icons/vsc";

type Props = {
  id: string;
};

type FeedbackType = "up" | "down" | null;

export default function VideoPlayer({ id }: Props) {
  const navigate = useNavigate();
  const { youtube } = useYoutubeApi();
  const observerRef = useRef<HTMLDivElement>(null); // 섹션 너비 감지용
  const containerRef = useRef<HTMLDivElement>(null); // 드롭다운 외부 클릭 감지용
  const [width, setWidth] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackType>(null);

  const { data: video } = useQuery({
    queryKey: ["video", id],
    queryFn: () => youtube.getVideoById(id),
  });

  const channelId = video?.snippet?.channelId;

  const { data: channel } = useQuery({
    queryKey: ["channel", channelId],
    queryFn: () => youtube.getChannelById(channelId!),
    enabled: !!channelId,
  });
  const handleDescriptionOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  const handleChannelClick = () => navigate(`/@${channelId}`);

  // 섹션 너비 변화 감지 → width 상태 업데이트
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width); // ResizeObserver 콜백 함수에선 contentRect를 사용해 요소의 크기, 위치 정보 등을 제공
    });
    if (observerRef.current) observer.observe(observerRef.current); // 페이지 너비 관찰
    return () => observer.disconnect();
  }, []);

  // 드롭다운이 열린 상태에서 외부 클릭 시 닫기
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) // 클릭 대상이 컨테이너 밖이면
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  const isCol = width > 0 && width < 600;

  // 너비에 따라 드롭다운으로 숨길 버튼 수 결정
  // hiddenCount 1 → "저장" 숨김, hiddenCount 2 → "저장" + "질문하기" 숨김
  const hiddenCount = isCol
    ? width < 450
      ? 2
      : width < 550
        ? 1
        : 0
    : width < 800
      ? 2
      : width < 900
        ? 1
        : 0;

  // 액션 버튼 모음 (좋아요/싫어요/공유/질문하기/저장/더보기)
  const buttons = (
    <>
      <FeedBackBtn
        icon={feedback === "up" ? <VscThumbsupFilled /> : <LuThumbsUp />}
        text={formatCount(video?.statistics.likeCount)}
        onClick={() => {
          setFeedback((prev) => (prev === "up" ? null : "up"));
        }}
        style="rounded-none rounded-l-full bg-zinc-800"
      />
      <div className="w-px h-9 bg-zinc-800 flex items-center justify-center">
        <div className="w-px h-5 bg-white/20" />
      </div>
      <FeedBackBtn
        icon={feedback === "down" ? <VscThumbsdownFilled /> : <LuThumbsDown />}
        onClick={() => {
          setFeedback((prev) => (prev === "down" ? null : "down"));
        }}
        style="mr-2 rounded-none rounded-r-full bg-zinc-800"
      />
      <FeedBackBtn
        icon={<TbShare3 />}
        text={"공유"}
        onClick={() => {}}
        style="mr-2 bg-zinc-800"
      />
      {hiddenCount < 2 && (
        <FeedBackBtn
          icon={<RiGeminiFill />}
          text={"질문하기"}
          onClick={() => {}}
          style="mr-2 bg-zinc-800"
        />
      )}
      {hiddenCount < 1 && (
        <FeedBackBtn
          icon={<MdOutlineBookmarkBorder />}
          text={"저장"}
          onClick={() => {}}
          style="mr-2 bg-zinc-800"
        />
      )}

      {/* 더보기 버튼 + 드롭다운 */}
      <div className="relative">
        <FeedBackBtn
          icon={<MdMoreHoriz />}
          onClick={() => setDropdownOpen((p) => !p)}
          style="w-9 bg-zinc-800"
        />

        {/*  드롭다운 표시 */}
        {dropdownOpen && (
          <div className="absolute right-0 top-11 bg-zinc-800 rounded-xl overflow-hidden z-50 min-w-40">
            {hiddenCount >= 1 && (
              <DropdownMenuItem
                icon={<MdOutlineBookmarkBorder />}
                text="저장"
                onClick={() => {}}
              />
            )}
            {hiddenCount >= 2 && (
              <DropdownMenuItem
                icon={<RiGeminiFill />}
                text="질문하기"
                onClick={() => {}}
              />
            )}
            <DropdownMenuItem
              icon={<RiDownloadLine />}
              text="오프라인 저장"
              onClick={() => {}}
            />
            <DropdownMenuItem
              icon={<FiFlag />}
              text="신고"
              onClick={() => {}}
            />
          </div>
        )}
      </div>
    </>
  );

  return (
    <div ref={observerRef}>
      <section>
        <iframe
          id="player"
          width="100%"
          src={`http://www.youtube.com/embed/${id}`}
          className="aspect-video rounded-lg"
        ></iframe>

        <div className="my-4">
          <h1 className="text-xl font-semibold mb-3">{video?.snippet.title}</h1>

          <div className="sm:flex sm:justify-between max-sm:flex-col max-sm:gap-2">
            <div className="flex gap-6 items-center">
              {channel && (
                <ChannelSubscriber
                  channel={channel}
                  onClick={handleChannelClick}
                />
              )}
              <FeedBackBtn text="구독" onClick={() => {}} />
            </div>
            <div
              ref={containerRef}
              className={`flex relative ${isCol ? "flex-col gap-2 mt-4" : "max-sm:mt-4"}`}
            >
              {isCol ? (
                <div className="flex items-center">{buttons}</div>
              ) : (
                buttons
              )}
            </div>
          </div>
        </div>
        <div
          className="bg-zinc-800 rounded-lg p-3 text-[14px] mb-5"
          onClick={handleDescriptionOpen}
        >
          <span className="font-semibold">
            조회수 {formatCount(video?.statistics.viewCount)}회
          </span>{" "}
          <span className="font-semibold">
            {video?.snippet.publishedAt &&
              formatAgo(video.snippet.publishedAt, "ko")}
          </span>
          {video?.snippet.description ? (
            <div className={isExpanded ? "" : "line-clamp-2"}>
              {video.snippet.description}
            </div>
          ) : (
            <div className="text-zinc-500">
              이 동영상에 추가된 설명이 없습니다.
            </div>
          )}
          {channel && isExpanded && (
            <div className="my-10" onClick={(e) => e.stopPropagation()}>
              <h2 className="mb-3 text-lg font-semibold">질문하기</h2>
              <span className="text-zinc-500">
                궁금한 점을 해결하고, 관심 있는 주제도 살펴보세요
              </span>
              <FeedBackBtn
                icon={<RiGeminiFill />}
                text="질문하기"
                onClick={() => {}}
                style="border-1 border-solid border-zinc-600 mt-3 mb-10"
              />

              <div className="my-5">
                <ChannelSubscriber
                  channel={channel}
                  onClick={handleChannelClick}
                />
              </div>
              <div className="flex gap-3">
                <FeedBackBtn
                  icon={<GoVideo />}
                  text="동영상"
                  onClick={handleChannelClick}
                  style="border-1 border-solid border-zinc-600"
                />
                <FeedBackBtn
                  icon={<BsPersonSquare />}
                  text="정보"
                  onClick={() => {}}
                  style="border-1 border-solid border-zinc-600"
                />
              </div>
            </div>
          )}
          <button className="cursor-pointer active:bg-zinc-100/20 rounded-sm p-0.5 font-semibold">
            {isExpanded ? "간략히" : "...더보기"}
          </button>
        </div>
      </section>
    </div>
  );
}
