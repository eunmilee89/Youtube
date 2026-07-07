import { LuSearch } from "react-icons/lu";
import { LuMic } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import FeedBackBtn from "./FeedBackBtn";

export default function SearchForm() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("search_query") || "";
  const navigate = useNavigate();
  const [text, setText] = useState(keyword);

  useEffect(() => {
    setText(keyword);
  }, [keyword]);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    navigate(`/results?search_query=${text}`);
  };

  return (
    <div className="flex justify-center items-center gap-4 flex-1 max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="flex w-full justify-center border-[0.5px] border-zinc-700 rounded-full overflow-hidden"
      >
        <input
          className="w-full px-6 py-2 outline-none text-gray-50 text-base"
          type="text"
          placeholder="검색"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="bg-zinc-800 px-4 cursor-pointer">
          <LuSearch />
        </button>
      </form>
      <FeedBackBtn
        icon={<LuMic />}
        onClick={() => {}}
        style={"w-10 h-10 bg-zinc-800"}
        iconSize="text-2xl"
      />
    </div>
  );
}
