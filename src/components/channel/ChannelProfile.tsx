import { BiHome } from "react-icons/bi";
import { LuConstruction } from "react-icons/lu";

interface Props {
  id: string;
}

export default function ChannelProfile({ id }: Props) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800">
        <LuConstruction className="h-10 w-10 text-zinc-300" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          {id} 페이지 준비중입니다
        </h1>
        <p className="text-sm text-zinc-400 sm:text-base">
          더 나은 서비스를 위해 열심히 준비하고 있어요.
          <br />
          조금만 기다려주세요!
        </p>
      </div>

      <div className="h-1.5 w-48 overflow-hidden rounded-full bg-zinc-700">
        <div className="h-full w-2/3 animate-pulse rounded-full bg-white" />
      </div>

      <a
        href="/"
        className="mt-2 inline-flex items-center gap-1.5 rounded-md border px-4 py-2 text-sm font-medium  transition border-zinc-600 text-zinc-200 hover:bg-zinc-800"
      >
        <BiHome className="h-4 w-4" />
        홈으로 돌아가기
      </a>
    </div>
  );
}
