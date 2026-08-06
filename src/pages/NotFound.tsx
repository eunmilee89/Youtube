import { BiHome } from "react-icons/bi";
import { TbMoodSad } from "react-icons/tb";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800">
        <TbMoodSad className="h-10 w-10 text-zinc-300" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          404 페이지를 찾을 수 없습니다
        </h1>
        <p className="text-sm text-zinc-400 sm:text-base">
          요청하신 페이지가 존재하지 않거나 삭제되었을 수 있어요.
          <br />
          주소를 다시 확인해주세요.
        </p>
      </div>

      <a
        href="/"
        className="mt-2 inline-flex items-center gap-1.5 rounded-md border px-4 py-2 text-sm font-medium transition border-zinc-600 text-zinc-200 hover:bg-zinc-800"
      >
        <BiHome className="h-4 w-4" />
        홈으로 돌아가기
      </a>
    </div>
  );
}
