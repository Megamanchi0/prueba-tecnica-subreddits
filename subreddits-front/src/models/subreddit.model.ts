import { AllowedMedia } from "./allowedMedia.model";

export interface Subreddit{
    id?: string;
    name?: string;
    title?: string;
    description?: string;
    public_description?: string;
    icon_img?: string;
    banner_img?: string;
    lang?: string;
    subscribers?: number;
    created_utc?: number;
    spoilers_enabled?: boolean;
    wiki_enabled?: boolean;
    emojis_enabled?: boolean;
    over18?: boolean;
    public_traffic?: boolean;
    allow_videos?: boolean;
    allow_galleries?: boolean;
    restrict_posting?: boolean;
    allowed_media_in_comments?: AllowedMedia[];
    mobile_banner_image?: string;
}