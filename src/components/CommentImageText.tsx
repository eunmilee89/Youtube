import { LuThumbsDown, LuThumbsUp } from "react-icons/lu";
import type { CommentSnippet } from "../../public/types/youtube";
import { formatAgo } from "../util/date";
import FeedBackBtn from "./FeedBackBtn";
import { formatCount } from "../util/formatCount";
import { useState } from "react";
import { VscThumbsdownFilled, VscThumbsupFilled } from "react-icons/vsc";
import CommentInput from "./CommentInput";

type Props = {
  snippet: CommentSnippet;
  id: string;
  style?: string;
  imgSize?: string;
};

type FeedbackType = "up" | "down" | null;

export default function CommentImageText({ snippet, id, style }: Props) {
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [inputOpen, setInputOpen] = useState(false);
  return (
    <div key={id} className={`flex gap-3 mb-6 ${style}`}>
      <img
        src={snippet.authorProfileImageUrl}
        className="w-9 h-9 rounded-full"
      />
      <div className="flex flex-col gap-2 w-full">
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
            icon={feedback === "up" ? <VscThumbsupFilled /> : <LuThumbsUp />}
            onClick={() => {
              setFeedback((prev) => (prev === "up" ? null : "up"));
            }}
            style="w-9"
            iconSize="text-sm"
          />
          <span className="text-xs text-zinc-400 mr-2">
            {formatCount(snippet.likeCount)}
          </span>
          <FeedBackBtn
            icon={
              feedback === "down" ? <VscThumbsdownFilled /> : <LuThumbsDown />
            }
            onClick={() => {
              setFeedback((prev) => (prev === "down" ? null : "down"));
            }}
            style="w-9 mr-1"
            iconSize="text-sm"
          />
          <FeedBackBtn
            text="답글"
            onClick={() => {
              setInputOpen((prev) => !prev);
            }}
            style="bg-zinc-900"
            textSize="text-xs"
          />
        </div>
        {inputOpen && <CommentInput closeInput={() => setInputOpen(false)} />}
      </div>
    </div>
  );
}
