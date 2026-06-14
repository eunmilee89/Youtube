export interface YoutubeListResponse<T> {
  kind: string;
  etag: string;
  nextPageToken?: string;
  regionCode?: string;
  pageInfo: PageInfo;
  items: T[];
}

export type SearchResponse = {
  items: SearchResultItem[];
  nextPageToken?: string;
};

export interface SearchResultItem {
  kind: string;
  etag: string;
  id: VideoId;
  snippet: Snippet;
  statistics: VideoStatistics;
}

export interface VideoId {
  kind: string;
  videoId: string;
}

export interface Snippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

// comment
export interface CommentThread {
  kind: string;
  etag: string;
  id: string;
  snippet: CommentThreadSnippet;
  replies?: {
    comments: Comment[];
  };
}

export interface CommentThreadSnippet {
  channelId: string;
  videoId: string;
  topLevelComment: Comment;
  canReply: boolean;
  totalReplyCount: number;
  isPublic: boolean;
}
export interface Comment {
  kind: string;
  etag: string;
  id: string;
  snippet: CommentSnippet;
}

export interface CommentSnippet {
  channelId: string;
  videoId: string;
  textDisplay: string;
  textOriginal: string;
  parentId?: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  authorChannelUrl: string;
  authorChannelId: {
    value: string;
  };
  canRate: boolean;
  viewerRating: string;
  likeCount: number;
  publishedAt: Date;
  updatedAt: string;
}

export interface ChannelItem {
  kind: "youtube#channel";
  etag: string;
  id: string;
  snippet: ChannelSnippet;
  contentDetails: ChannelContentDetails;
  statistics: ChannelStatistics;
}

interface ChannelSnippet {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: Thumbnails;
  localized: {
    title: string;
    description: string;
  };
  country: string;
}

interface ChannelContentDetails {
  relatedPlaylists: {
    likes: string;
    uploads: string;
  };
}

interface ChannelStatistics {
  viewCount: string;
  subscriberCount: string;
  hiddenSubscriberCount: boolean;
  videoCount: string;
}

interface VideoStatistics {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}
