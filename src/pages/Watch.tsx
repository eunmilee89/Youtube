import { useSearchParams } from "react-router";
import VideoPlayer from "../components/VideoPlayer";

export default function Watch() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  if (!videoId) return <div>영상을 선택해주세요</div>;

  return <VideoPlayer id={videoId} />;
}
