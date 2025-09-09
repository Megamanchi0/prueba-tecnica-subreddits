"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubredditService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class SubredditService {
    constructor() {
        this.pageSize = 9;
    }
    async getSubreddits(page) {
        return await prisma_1.default.subreddit.findMany({
            include: {
                allowed_media_in_comments: {
                    include: {
                        mediaType: true,
                    },
                },
            },
            skip: (page - 1) * this.pageSize,
            take: this.pageSize
        });
    }
    async getSubredditById(id) {
        return await prisma_1.default.subreddit.findUnique({
            where: { id: id },
            include: {
                allowed_media_in_comments: {
                    include: {
                        mediaType: true,
                    },
                },
            },
        });
    }
    async saveSubreddits() {
        const subredditExists = await this.getSubreddits(1);
        if (subredditExists.length > 0) {
            throw new Error("Ys existen subreddits en la base de datos");
        }
        const subreddits = await this.getSubredditsApi();
        for (let index = 0; index < subreddits.length; index++) {
            const subreddit = subreddits[index];
            await prisma_1.default.subreddit.create({
                data: {
                    id: subreddit.id,
                    name: subreddit.name,
                    title: subreddit.title,
                    description: subreddit.description,
                    public_description: subreddit.public_description,
                    icon_img: subreddit.icon_img,
                    banner_img: subreddit.banner_img,
                    lang: subreddit.lang,
                    subscribers: subreddit.subscribers,
                    created_utc: subreddit.created_utc,
                    spoilers_enabled: subreddit.spoilers_enabled,
                    wiki_enabled: subreddit.wiki_enabled,
                    emojis_enabled: subreddit.emojis_enabled,
                    over18: subreddit.over18,
                    public_traffic: subreddit.public_traffic,
                    allow_videos: subreddit.allow_videos,
                    allow_galleries: subreddit.allow_galleries,
                    restrict_posting: subreddit.restrict_posting,
                    mobile_banner_image: subreddit.mobile_banner_image
                }
            });
            for (let index = 0; index < subreddit.allowed_media_in_comments.length; index++) {
                const element = subreddit.allowed_media_in_comments[index];
                let mediaType = await prisma_1.default.mediaTypes.findFirst({
                    where: {
                        name: element
                    }
                });
                if (!mediaType) {
                    mediaType = await prisma_1.default.mediaTypes.create({
                        data: { name: element }
                    });
                }
                await prisma_1.default.subredditMediaTypes.create({
                    data: {
                        media_type_id: mediaType.id,
                        subreddit_id: subreddit.id
                    }
                });
            }
        }
    }
    async deleteSubreddits() {
        await prisma_1.default.subredditMediaTypes.deleteMany();
        await prisma_1.default.subreddit.deleteMany();
        await prisma_1.default.mediaTypes.deleteMany();
    }
    async getSubredditsApi() {
        const res = await fetch("https://www.reddit.com/reddits.json");
        const data = await res.json();
        return data.data.children.map((child) => {
            return child.data;
        });
    }
    async getPages() {
        const totalRecords = await prisma_1.default.subreddit.count();
        const totalPages = Math.ceil(totalRecords / this.pageSize);
        return totalPages;
    }
}
exports.SubredditService = SubredditService;
