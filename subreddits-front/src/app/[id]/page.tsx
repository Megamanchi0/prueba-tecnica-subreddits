"use client"

import { Spinner } from "@/components/Spinner";
import { Subreddit } from "@/models/subreddit.model";
import { getSubredditById } from "@/services/subredditService";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  subreddit: Subreddit;
};

export default function SubredditDetail() {
  const [subreddit, setSubreddit] = useState<Subreddit>();
  const params = useParams()

  useEffect(() => {
    getSubreddit();
  }, [])

  const getSubreddit = async () => {
        try {
            const response = await getSubredditById(params.id as string);
            if (response.ok) {
                const data = await response.json();
                setSubreddit(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

  if (!subreddit) {
    return (
        <div className="my-[40vh]">
            <Spinner />
        </div>
    )
  }

  const createdDate = new Date(subreddit?.created_utc! * 1000).toLocaleDateString();

  return (
    <div className="py-[9vh] bg-gray-100 md:w-10/12 mx-auto min-h-[100vh] px-5 flex">
        <Link href={"/"} >
            <div className="absolute md:ml-16 w-10 h-10 flex items-center justify-center rounded-full bg-[#FF5700] text-white cursor-pointer mt-6 ml-8">
                <i className="fa-solid fa-arrow-left"></i>
            </div>
        </Link>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                src={subreddit?.mobile_banner_image || subreddit?.banner_img || "https://static-www.adweek.com/wp-content/uploads/2019/10/Reddit-Logo-Horizontal.png?w=1240"}
                alt="Subreddit banner"
                className="object-cover w-full h-full"
                />
            </div>

            <div className="p-6">
                <div className="flex items-center mb-4">
                <div className="w-14 h-14 rounded-full bg-gray-100 overflow-hidden border border-gray-300 mr-4">
                    <img
                    src={subreddit?.icon_img || 'https://images.seeklogo.com/logo-png/40/1/reddit-logo-png_seeklogo-409489.png'}
                    alt="Subreddit icon"
                    className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{subreddit?.title}</h1>
                    <p className="text-sm text-gray-500">{subreddit?.name}</p>
                </div>
                </div>

                <p className="text-gray-700 mb-4">
                {subreddit?.public_description || subreddit?.description}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                <div>
                    <span className="font-medium">Subscribers:</span>{' '}
                    {subreddit?.subscribers!.toLocaleString()}
                </div>
                <div>
                    <span className="font-medium">Created on:</span> {createdDate}
                </div>
                <div>
                    <span className="font-medium">Language:</span> {subreddit?.lang}
                </div>
                <div>
                    <span className="font-medium">NSFW:</span>{' '}
                    {subreddit?.over18 ? 'Yes 🔞' : 'No'}
                </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                {subreddit?.spoilers_enabled && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    Spoilers enabled
                    </span>
                )}
                {subreddit?.restrict_posting && (
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                    Posting restricted
                    </span>
                )}
                {subreddit?.allow_videos && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Videos allowed
                    </span>
                )}
                {subreddit?.allow_galleries && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    Galleries allowed
                    </span>
                )}
                {subreddit?.wiki_enabled && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Wiki enabled
                    </span>
                )}
                </div>

                {subreddit?.allowed_media_in_comments!.length! > 0 && (
                <div>
                    <h2 className="text-sm font-semibold text-gray-700 mb-2">Allowed media in comments:</h2>
                    <div className="flex flex-wrap gap-2">
                    {subreddit?.allowed_media_in_comments!.map((media) => (
                        <span
                        key={media.media_type_id}
                        className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded-full"
                        >
                        {media.mediaType.name}
                        </span>
                    ))}
                    </div>
                </div>
                )}
            </div>
        </div>
    </div>
    
  );
};