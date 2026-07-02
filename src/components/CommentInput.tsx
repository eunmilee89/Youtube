import { LuUserRound } from "react-icons/lu";
import FeedBackBtn from "./FeedBackBtn";
import { useState } from "react";
type Props = {
  closeInput: () => void;
};

export default function CommentInput({ closeInput }: Props) {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-2 mb-3">
      <div className="flex gap-3">
        <FeedBackBtn
          icon={<LuUserRound />}
          onClick={() => {}}
          style={"w-9 h-9 bg-zinc-800"}
          iconSize="text-xl"
        />
        <input
          type="text"
          className="border-b-1 border-zinc-600 w-full text-sm outline-none focus:border-b-2 focus:border-zinc-200"
          onChange={(e) => setValue(e.target.value)}
          autoFocus
        />
      </div>
      <div className="flex justify-end gap-3">
        <FeedBackBtn text="취소" onClick={closeInput} style="bg-zinc-900" />
        <FeedBackBtn text="댓글" onClick={() => {}} disabled={!value.trim()} />
      </div>
    </div>
  );
}
