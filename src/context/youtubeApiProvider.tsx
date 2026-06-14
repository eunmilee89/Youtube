import Youtube from "../api/youtube";
import { YoutubeApiContext } from "./youtubeApiContext";

const youtube = new Youtube();
export function YoutubeApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <YoutubeApiContext value={{ youtube }}>{children}</YoutubeApiContext>;
}
