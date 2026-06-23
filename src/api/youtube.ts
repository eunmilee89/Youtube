import {
  type SearchResultItem,
  type CommentThread,
  type YoutubeListResponse,
  type ChannelItem,
  type SearchResponse,
} from "./../../public/types/youtube";
import axios, { type AxiosInstance } from "axios";

export default class Youtube {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: {
        key: import.meta.env.VITE_YOUTUBE_API_KEY,
      },
    });
  }

  async searchByKeyword(
    keyword: string,
    pageToken?: string,
  ): Promise<SearchResponse> {
    return this.httpClient
      .get<YoutubeListResponse<SearchResultItem>>("search", {
        params: {
          part: "snippet",
          q: keyword,
          maxResults: 25,
          pageToken,
        },
      })
      .then((res) => ({
        items: res.data.items,
        nextPageToken: res.data.nextPageToken,
      }));
  }

  async getChannelById(channelId: string): Promise<ChannelItem> {
    return this.httpClient
      .get("channels", {
        params: {
          part: "snippet,statistics",
          id: channelId,
          maxResults: 25,
        },
      })
      .then((res) => res.data.items[0]);
  }

  async getMostPopularVideos() {
    return this.httpClient
      .get("videos", {
        params: {
          part: "snippet,statistics",
          chart: "mostPopular",
          maxResults: 25,
        },
      })
      .then((res) => res.data.items);
  }

  async getVideoById(videoId: string): Promise<SearchResultItem> {
    return this.httpClient
      .get<YoutubeListResponse<SearchResultItem>>("videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          id: videoId,
        },
      })
      .then((res) => res.data.items[0]);
  }

  getComments(videoId: string, pageToken?: string) {
    return this.httpClient
      .get<YoutubeListResponse<CommentThread>>("commentThreads", {
        params: {
          part: "id,snippet,replies",
          videoId: videoId,
          maxResults: 20,
          textFormat: "html",
          pageToken,
        },
      })
      .then((res) => res.data);
  }
}
