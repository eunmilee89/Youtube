import { LuThumbsDown, LuThumbsUp } from "react-icons/lu";
import type { CommentSnippet } from "../../public/types/youtube";
import { formatAgo } from "../util/date";
import FeedBackBtn from "./FeedBackBtn";
import { formatCount } from "../util/formatCount";

type Props = {
  snippet: CommentSnippet;
  id: string;
  style?: string;
  imgSize?: string;
};

export default function CommentImageText({ snippet, id, style }: Props) {
  return (
    <div key={id} className={`flex gap-3 mb-6 ${style}`}>
      {/* TODO: 답글 이미지 크기랑 패딩 설정 다시 하기  */}
      <img
        src={snippet.authorProfileImageUrl}
        className="w-9 h-9 rounded-full"
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center text-[13px] gap-2">
          <div className="font-semibold">{snippet.authorDisplayName}</div>
          <div className="text-zinc-400 text-xs">
            {snippet.publishedAt === snippet.updatedAt
              ? formatAgo(snippet.publishedAt, "ko")
              : `${formatAgo(snippet.publishedAt, "ko")}(수정됨)`}
          </div>
        </div>
        <div className="text-sm">{snippet.textOriginal}</div>
        <div className="flex items-center">
          <FeedBackBtn
            icon={<LuThumbsUp />}
            onClick={() => {}}
            style="w-9"
            iconSize="text-sm"
          />
          <span className="text-xs text-zinc-400 mr-2">
            {formatCount(snippet.likeCount)}
          </span>
          <FeedBackBtn
            icon={<LuThumbsDown />}
            onClick={() => {}}
            style="w-9 mr-1"
            iconSize="text-sm"
          />
          <FeedBackBtn
            text="답글"
            onClick={() => {}}
            style="bg-zinc-900"
            textSize="text-xs"
          />
        </div>
      </div>
    </div>
  );
}
