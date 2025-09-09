import { SubredditModel } from "../models/subreddit.model";
import prisma from "../prisma";

export class SubredditService {
    pageSize = 9;

    async getSubreddits(page: number) {
        return await prisma.subreddit.findMany({
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

    async getSubredditById(id: string) {
        return await prisma.subreddit.findUnique({
            where: {id: id},
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
            await prisma.subreddit.create(
                {
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
                    
                }
            );
            for (let index = 0; index < subreddit.allowed_media_in_comments!.length; index++) {
                const element = subreddit.allowed_media_in_comments![index];
                let mediaType = await prisma.mediaTypes.findFirst({
                    where: {
                        name: element
                    }
                });
                if (!mediaType) {
                    mediaType = await prisma.mediaTypes.create({
                        data: { name: element}
                    });
                }
                await prisma.subredditMediaTypes.create({
                    data: {
                        media_type_id: mediaType.id,
                        subreddit_id: subreddit.id
                    }
                });
            }
            
        }
    }

    async deleteSubreddits() {
        await prisma.subredditMediaTypes.deleteMany();
        await prisma.subreddit.deleteMany();
        await prisma.mediaTypes.deleteMany();
    }

    async getSubredditsApi(): Promise<SubredditModel[]> {
        const res = await fetch("https://www.reddit.com/reddits.json");
        const data = await res.json();
        return data.data.children.map((child: any) => {
            return child.data as SubredditModel;
        })
    }

    async getPages(): Promise<number> {
        const totalRecords = await prisma.subreddit.count();
        const totalPages = Math.ceil(totalRecords / this.pageSize);
        return totalPages;
    }
}