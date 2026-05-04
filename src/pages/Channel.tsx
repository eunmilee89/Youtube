import { useParams } from "react-router";
import ChannelProfile from "../components/ChannelProfile";

export default function Channel() {
  const { channelId } = useParams();
  if (!channelId) return <div>채널이 없습니다.</div>;

  return <ChannelProfile id={channelId} />;
}
