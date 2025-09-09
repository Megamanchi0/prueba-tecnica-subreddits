import { MediaType } from "./mediaType.models";

export interface AllowedMedia {
    subreddit_id: string;
    media_type_id: number;
    mediaType: MediaType;
}