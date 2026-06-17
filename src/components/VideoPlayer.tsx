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
import Comment from "./Comment";

type Props = {
  id: string;
};

export default function VideoPlayer({ id }: Props) {
  const navigate = useNavigate();
  const { youtube } = useYoutubeApi();
  const observerRef = useRef<HTMLDivElement>(null); // 섹션 너비 감지용
  const containerRef = useRef<HTMLDivElement>(null); // 드롭다운 외부 클릭 감지용
  const [width, setWidth] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        icon={<LuThumbsUp />}
        text={formatCount(video?.statistics.likeCount)}
        onClick={() => {}}
        style="rounded-none rounded-l-full"
      />
      <div className="w-[1px] h-9 bg-zinc-800 flex items-center justify-center">
        <div className="w-[1px] h-5 bg-white/20" />
      </div>
      <FeedBackBtn
        icon={<LuThumbsDown />}
        onClick={() => {}}
        style="mr-2 rounded-none rounded-r-full"
      />
      <FeedBackBtn
        icon={<TbShare3 />}
        text={"공유"}
        onClick={() => {}}
        style="mr-2"
      />
      {hiddenCount < 2 && (
        <FeedBackBtn
          icon={<RiGeminiFill />}
          text={"질문하기"}
          onClick={() => {}}
          style="mr-2"
        />
      )}
      {hiddenCount < 1 && (
        <FeedBackBtn
          icon={<MdOutlineBookmarkBorder />}
          text={"저장"}
          onClick={() => {}}
          style="mr-2"
        />
      )}

      {/* 더보기 버튼 + 드롭다운 */}
      <div className="relative">
        <FeedBackBtn
          icon={<MdMoreHoriz />}
          onClick={() => setDropdownOpen((p) => !p)}
          style="w-9"
        />

        {/*  드롭다운 표시 */}
        {dropdownOpen && (
          <div className="absolute right-0 top-11 bg-zinc-800 rounded-xl overflow-hidden z-50 min-w-[160px]">
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
    <div ref={observerRef} className="mx-4">
      <section>
        <iframe
          id="player"
          width="100%"
          src={`http://www.youtube.com/embed/${id}`}
          className="aspect-video rounded-lg"
        ></iframe>

        <div className="my-4">
          <h1 className="text-xl font-semibold mb-2">{video?.snippet.title}</h1>

          <div className="sm:flex sm:justify-between max-sm:flex-col max-sm:gap-2">
            <div className="flex items-center">
              <img
                src={channel?.snippet?.thumbnails?.default.url}
                className="rounded-full w-10 h-10 mr-3 cursor-pointer"
                onClick={handleChannelClick}
              />
              <div className="flex gap-5 items-center">
                <div>
                  <div className="cursor-pointer" onClick={handleChannelClick}>
                    {channel?.snippet.title}
                  </div>
                  {formatCount(channel?.statistics?.subscriberCount) && (
                    <div className="text-xs text-zinc-400">
                      구독자 {formatCount(channel?.statistics.subscriberCount)}
                      명
                    </div>
                  )}
                </div>
                <FeedBackBtn text={"구독"} onClick={() => {}} />
              </div>
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
      </section>

      <section>
        <Comment id={id} />
      </section>
    </div>
  );
}
