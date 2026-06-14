import { createContext } from "react";
import Youtube from "../api/youtube";
import FakeYoutube from "../api/fakeYoutube";

const youtube: Youtube = new FakeYoutube(); // new Youtube();

export const YoutubeApiContext = createContext<{
  youtube: Youtube;
} | null>({
  youtube,
});
