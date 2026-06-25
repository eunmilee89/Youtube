import type { ChannelItem, SearchResultItem } from "../../public/types/youtube";
import { formatAgo } from "../util/date";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "../context/useYoutubeApi";
import ChannelImageText from "./ChannelImageText";
import { formatCount } from "../util/formatCount";
import { decodeHtmlEntities } from "../util/decodeHtmlEntities";

interface Props {
  video: SearchResultItem;
  id: string;
}

export default function VideoCard({ video, id }: Props) {
  const navigate = useNavigate();

  const { youtube } = useYoutubeApi();

  const { data: channel } = useQuery<ChannelItem>({
    queryKey: ["channel", video.snippet.channelId],
    queryFn: () => youtube.getChannelById(video.snippet.channelId),
  });
  const { data } = useQuery<SearchResultItem>({
    queryKey: ["video", id],
    queryFn: () => youtube.getVideoById(id),
  });

  const handleVideoClick = () => {
    navigate(`/watch?v=${id}`);
  };
  return (
    <li key={id} className="w-full flex flex-col sm:flex-row gap-4">
      <div
        className="sm:max-w-90 sm:min-w-60 sm:shrink-0"
        onClick={handleVideoClick}
      >
        <img
          className="w-full aspect-video rounded-lg object-cover cursor-pointer"
          src={video.snippet.thumbnails.high.url}
        />
      </div>

      <div className="flex gap-3 sm:contents">
        <ChannelImageText
          data={channel}
          channelId={video.id.videoId}
          channelName={undefined}
          className="sm:hidden self-start"
          channelSize="w-8 h-8 mt-1"
        />

        <div className="flex-1 min-w-0" onClick={handleVideoClick}>
          <div className="flex flex-col cursor-pointer">
            <h3 className="text-lg line-clamp-2">
              {decodeHtmlEntities(video.snippet.title)}
            </h3>

            <div className="flex items-center gap-1 text-xs text-zinc-400 my-1">
              <span>조회수 {formatCount(data?.statistics.viewCount)}회</span>
              <span>·</span>
              <span>{formatAgo(video.snippet.publishedAt, "ko")}</span>
            </div>
            <ChannelImageText
              data={channel}
              channelId={video.id.videoId}
              channelName={channel?.snippet.title}
              className="hidden sm:block mt-1 py-1.5"
            />

            <div className="text-xs text-zinc-400 mt-2 max-sm:hidden">
              <span className="line-clamp-2">{video.snippet.description}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
