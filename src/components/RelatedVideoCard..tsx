import { useNavigate } from "react-router";
import { useYoutubeApi } from "../context/useYoutubeApi";
import { useQuery } from "@tanstack/react-query";
import type {
  ChannelItem,
  SearchResultItem,
  VideoItem,
} from "../../public/types/youtube";
import ChannelImageText from "./ChannelImageText";
import { decodeHtmlEntities } from "../util/decodeHtmlEntities";
import { formatCount } from "../util/formatCount";
import { formatAgo } from "../util/date";

interface Props {
  video: SearchResultItem | VideoItem;
  id: string;
  channelId: string;
  keyword?: string;
  variant: "vertical" | "horizontal";
  image?: boolean;
}

export default function RelatedVideoCard({
  video,
  id,
  channelId,
  keyword,
  variant,
  image = true,
}: Props) {
  const navigate = useNavigate();

  const { youtube } = useYoutubeApi();

  const { data: channel } = useQuery<ChannelItem>({
    queryKey: ["channel", channelId],
    queryFn: () => youtube.getChannelById(channelId),
  });
  const { data } = useQuery<SearchResultItem>({
    queryKey: ["video", id],
    queryFn: () => youtube.getVideoById(id),
    enabled: !!id,
  });

  const handleVideoClick = () => {
    navigate(`/watch?v=${id}`, {
      state: keyword ? { keyword } : {},
    });
  };

  const handleChannelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/@${channelId}`);
  };

  return (
    <li
      key={id}
      className={`w-full flex flex-col ${variant === "horizontal" && "lg:flex-row"} gap-4`}
    >
      <div
        className={
          variant === "horizontal"
            ? "basis-1/2 shrink-0 cursor-pointer"
            : "w-full cursor-pointer"
        }
        onClick={handleVideoClick}
      >
        <img
          className="w-full aspect-video rounded-lg object-cover cursor-pointer"
          src={video.snippet.thumbnails.high.url}
        />
      </div>

      <div className="flex gap-3 ">
        {image && (
          <ChannelImageText
            data={channel}
            channelId={channelId}
            channelName={undefined}
            className="self-start"
            channelSize="w-8 h-8 mt-1"
          />
        )}

        <div className="flex-1 min-w-40" onClick={handleVideoClick}>
          <div className="flex flex-col cursor-pointer">
            <h3 className="text-xs lg:text-base font-medium line-clamp-2 break-words overflow-hidden">
              {decodeHtmlEntities(video.snippet.title)}
            </h3>

            {channel && (
              <span
                className="cursor-pointer text-xs text-zinc-400 hover:text-zinc-300"
                onClick={handleChannelClick}
              >
                {channel.snippet.title}
              </span>
            )}
            <div className="flex items-center gap-1 text-xs text-zinc-400 my-1">
              <span>조회수 {formatCount(data?.statistics.viewCount)}회</span>
              <span>·</span>
              <span>{formatAgo(video.snippet.publishedAt, "ko")}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
