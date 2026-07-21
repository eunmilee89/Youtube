import { createContext } from "react";
import Youtube from "../api/youtube";

const youtube: Youtube = new Youtube();
export const YoutubeApiContext = createContext<{
  youtube: Youtube;
} | null>({
  youtube,
});
