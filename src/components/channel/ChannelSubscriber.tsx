import type { ChannelItem } from "../../../public/types/youtube";
import { formatCount } from "../../util/formatCount";
type Props = {
  channel: ChannelItem;
  onClick: () => void;
};

export default function ChannelSubscriber({ channel, onClick }: Props) {
  return (
    <div className="flex items-center">
      <img
        src={channel?.snippet?.thumbnails?.default.url}
        className="rounded-full w-10 h-10 mr-3 cursor-pointer"
        onClick={onClick}
      />
      <div className="flex gap-5 items-center">
        <div>
          <div className="cursor-pointer" onClick={onClick}>
            {channel?.snippet.title}
          </div>
          {formatCount(channel?.statistics?.subscriberCount) && (
            <div className="text-xs text-zinc-400">
              구독자 {formatCount(channel?.statistics.subscriberCount)}명
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
