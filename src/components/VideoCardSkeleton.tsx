export default function VideoCardSkeleton() {
  return (
    <li className="w-full flex flex-col sm:flex-row gap-4 animate-pulse">
      <div className="sm:max-w-90 sm:min-w-60 sm:shrink-0">
        <div className="w-full aspect-video rounded-lg bg-zinc-800" />
      </div>

      <div className="flex gap-3 sm:contents">
        <div className="sm:hidden self-start shrink-0">
          <div className="w-9 h-9 rounded-full bg-zinc-800" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col">
            <div className="h-6 bg-zinc-800 rounded w-3/4 mb-1" />
            <div className="h-6 bg-zinc-800 rounded w-1/2" />

            <div className="flex items-center gap-2 mt-1">
              <div className="hidden sm:block w-9 h-9 rounded-full bg-zinc-800" />
              <div className="hidden sm:block h-3 bg-zinc-800 rounded w-24" />
              <div className="h-3 bg-zinc-800 rounded w-16" />
            </div>

            <div className="mt-2 max-sm:hidden flex flex-col gap-1">
              <div className="h-3 bg-zinc-800 rounded w-full" />
              <div className="h-3 bg-zinc-800 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
