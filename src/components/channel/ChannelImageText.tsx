import { LuUserRound } from "react-icons/lu";
import { useNavigate } from "react-router";
import type { ChannelItem } from "../../../public/types/youtube";

interface Props {
  data: ChannelItem | undefined;
  channelId: string | undefined;
  channelName: string | undefined;
  className?: string;
  channelSize?: string;
}

export default function ChannelImageText({
  data,
  channelId,
  channelName,
  className,
  channelSize,
}: Props) {
  const navigate = useNavigate();

  const handleChannelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/@${channelId}`);
  };

  return (
    <div className="flex items-center gap-2 text-xs text-zinc-400">
      <button
        className={`${className} shrink-0 cursor-pointer`}
        onClick={handleChannelClick}
      >
        {data ? (
          <img
            src={data.snippet.thumbnails.default.url}
            className={`${channelSize ? channelSize : "w-6 h-6"} rounded-full`}
          />
        ) : (
          <LuUserRound className="bg-zinc-800 rounded-full w-6 h-6 p-1" />
        )}
      </button>
      {channelName && (
        <span
          className="cursor-pointer hover:text-zinc-300"
          onClick={handleChannelClick}
        >
          {channelName}
        </span>
      )}
    </div>
  );
}
