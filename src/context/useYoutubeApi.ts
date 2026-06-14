import { useContext } from "react";
import { YoutubeApiContext } from "./youtubeApiContext";

export function useYoutubeApi() {
  const context = useContext(YoutubeApiContext);
  if (!context) throw new Error("YoutubeApiProvider 밖에서 사용됨");
  return context;
}
