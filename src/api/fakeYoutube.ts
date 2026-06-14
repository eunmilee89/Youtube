import axios from "axios";
import type {
  ChannelItem,
  CommentThread,
  SearchResponse,
  SearchResultItem,
} from "../../public/types/youtube";
import Youtube from "./youtube";

export default class FakeYoutube extends Youtube {
  constructor() {
    super();
  }

  async searchByKeyword(
    _keyword?: string,
    _pageToken?: string,
  ): Promise<SearchResponse> {
    return axios.get(`/data/keyword.json`).then((res) => ({
      items: res.data.items,
      nextPageToken: undefined,
    }));
  }

  async getMostPopularVideos() {
    return axios.get(`/data/popular.json`).then((res) => res.data.items);
  }

  async getChannelById(_channelId?: string): Promise<ChannelItem> {
    return axios.get(`/data/channel-id.json`).then((res) => res.data.items[0]);
  }

  async getCommentsByVideoId(_keyword?: string): Promise<CommentThread[]> {
    return axios.get(`/data/comment-by-id.json`).then((res) => res.data.items);
  }

  async getVideoById(_videoId?: string): Promise<SearchResultItem> {
    return axios.get(`/data/video-by-id.json`).then((res) => res.data.items[0]);
  }
}
