export default function VideoCardSkeleton() {
  return (
    <li className="w-full flex flex-col sm:flex-row gap-4 animate-pulse">
      <div className="sm:max-w-90 sm:min-w-50 w-full">
        <div className="w-full aspect-video rounded-lg bg-zinc-800" />
      </div>

      <div className="flex gap-3 sm:contents">
        <div className="sm:hidden self-start w-8 h-8 mt-1 rounded-full bg-zinc-800 shrink-0" />

        <div className="flex-1 min-w-40">
          <div className="flex flex-col">
            <div className="h-3 sm:h-4 w-3/4 bg-zinc-800 rounded mb-1.5" />
            <div className="h-3 sm:h-4 w-1/2 bg-zinc-800 rounded" />

            <div className="flex items-center gap-2 my-2">
              <div className="h-2.5 w-16 bg-zinc-800 rounded" />
              <div className="h-2.5 w-10 bg-zinc-800 rounded" />
            </div>

            <div className="hidden sm:flex items-center gap-2 mt-1 py-1.5">
              <div className="w-6 h-6 rounded-full bg-zinc-800 shrink-0" />
              <div className="h-3 w-24 bg-zinc-800 rounded" />
            </div>

            <div className="mt-2 max-sm:hidden space-y-1.5">
              <div className="h-2.5 w-2/3 bg-zinc-800 rounded" />
              <div className="h-2.5 w-1/3 bg-zinc-800 rounded" />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
