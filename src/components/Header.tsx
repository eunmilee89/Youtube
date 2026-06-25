import { LuArrowLeft, LuMenu, LuSearch } from "react-icons/lu";

import { LuPlus } from "react-icons/lu";
import { LuBell } from "react-icons/lu";
import { LuUserRound } from "react-icons/lu";
import { Link } from "react-router";
import SearchForm from "./SearchForm";
import { useState } from "react";
import FeedBackBtn from "./FeedBackBtn";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 flex w-full px-6 text-2xl mb-4 justify-between items-center bg-zinc-900 max-sm:py-1">
      {showSearch && (
        <div className="sm:hidden absolute inset-0 flex items-center px-2 bg-zinc-900 z-50">
          <button
            onClick={() => setShowSearch(false)}
            className="p-2 shrink-0 cursor-pointer"
          >
            <LuArrowLeft />
          </button>
          <SearchForm />
        </div>
      )}

      <Link to="/" className="flex items-center shrink-0">
        <LuMenu />
        <img
          src="/public/img/youtube logo 02.png"
          alt="youtube logo"
          className="w-34 hidden sm:block"
        />
        <img
          src="/public/img/youtube logo 05.png"
          alt="youtube logo"
          className="w-24 sm:hidden pt-1 -ml-3"
        />
      </Link>

      <div className="hidden sm:flex flex-1 mx-8 justify-center">
        <SearchForm />
      </div>

      <div className="flex justify-center items-center gap-4 ml-4">
        <button
          className="sm:hidden cursor-pointer"
          onClick={() => setShowSearch(true)}
        >
          <LuSearch />
        </button>
        <FeedBackBtn
          icon={<LuPlus />}
          text={"만들기"}
          onClick={() => {}}
          style="max-sm:hidden shrink-0 bg-zinc-800"
          iconSize="text-2xl"
        />
        <FeedBackBtn
          icon={<LuBell />}
          onClick={() => {}}
          style={"w-10 h-10 bg-zinc-900"}
          iconSize="text-2xl"
        />
        <FeedBackBtn
          icon={<LuUserRound />}
          onClick={() => {}}
          style={"w-10 h-10"}
          iconSize="text-2xl"
        />
      </div>
    </header>
  );
}
