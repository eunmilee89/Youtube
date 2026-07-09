import { useLocation, useSearchParams } from "react-router";
import VideoPlayer from "../components/VideoPlayer";
import Comment from "../components/Comment";
import SearchResult from "../components/SearchResult";

export default function Watch() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const location = useLocation();
  const keyword = (location.state as { keyword?: string })?.keyword;
  console.log(videoId);

  if (!videoId) return <div>영상을 선택해주세요</div>;

  return (
    <div className="mx-4">
      <div className="flex flex-col lg:flex-row">
        {/* row일 땐 VideoPlayer+Comment 묶음, col일 땐 VideoPlayer만 먼저 */}
        <div className="order-1 lg:order-none lg:flex-[2] lg:min-w-0">
          <VideoPlayer id={videoId} />
          <div className="hidden lg:block">
            <Comment id={videoId} />
          </div>
        </div>

        <div className="order-2 lg:order-none lg:flex-1 lg:min-w-[320px] lg:shrink-[0.3]">
          <SearchResult keyword={keyword ?? ""} />
        </div>

        {/* col일 때만 따로 렌더 */}
        <div className="order-3 lg:hidden">
          <Comment id={videoId} />
        </div>
      </div>
    </div>
  );
}
