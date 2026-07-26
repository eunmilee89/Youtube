import { useLocation, useSearchParams } from "react-router";
import VideoPlayer from "../components/video/VideoPlayer";
import Comment from "../components/comment/Comment";
import SearchResult from "../components/video/SearchResult";

export default function Watch() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const location = useLocation();
  const keyword = (location.state as { keyword?: string })?.keyword;

  if (!videoId) return <div>영상을 선택해주세요</div>;

  return (
    <div className="mx-4">
      <div className="flex flex-col lg:flex-row">
        <div className="order-1 lg:order-none lg:flex-[2] lg:min-w-0">
          <VideoPlayer id={videoId} />
          <div className="hidden lg:block">
            <Comment id={videoId} />
          </div>
        </div>

        <div className="order-2 lg:order-none lg:flex-1 lg:min-w-[320px] lg:shrink-[0.3]">
          <SearchResult keyword={keyword ?? ""} component="RelatedVideoCard" />
        </div>

        <div className="order-3 lg:hidden">
          <Comment id={videoId} />
        </div>
      </div>
    </div>
  );
}
