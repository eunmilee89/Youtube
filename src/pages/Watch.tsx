import { useSearchParams } from "react-router";
import VideoPlayer from "../components/VideoPlayer";
import Comment from "../components/Comment";

export default function Watch() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  if (!videoId) return <div>영상을 선택해주세요</div>;

  return (
    <div className="mx-4">
      <VideoPlayer id={videoId} />
      <Comment id={videoId} />
    </div>
  );
}
