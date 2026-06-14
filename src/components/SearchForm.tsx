import { LuSearch } from "react-icons/lu";
import { LuMic } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

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
      <button className="bg-zinc-800 rounded-full p-2 cursor-pointer">
        <LuMic />
      </button>
    </div>
  );
}
