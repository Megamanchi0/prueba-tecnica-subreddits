// components/SubredditList.tsx

import { Subreddit } from '@/models/subreddit.model';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  subreddits: Subreddit[] | [];
};

export function SubredditsList({ subreddits }: Props) {
    const router = useRouter();

    if (subreddits.length == 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mb-4 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17v-2a4 4 0 014-4h1a4 4 0 014 4v2m-2 0h-6m6 0v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2m-4 0h.01"
                    />
                </svg>

                <h2 className="text-lg font-semibold mb-1">No hay subreddits</h2>
                <p className="text-sm text-gray-400">
                    Intenta consultar los registros a través del botón.
                </p>
            </div>
        );
    }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {subreddits.map((subreddit) => (
        <div
          key={subreddit.id}
          className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => router.push(`/${subreddit.id}`)}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-1">
            {subreddit.title}
          </h2>
          <img className='mx-auto' src={subreddit.mobile_banner_image || "https://static-www.adweek.com/wp-content/uploads/2019/10/Reddit-Logo-Horizontal.png?w=1240"} alt="Banner image" />
          <p className="text-sm text-gray-500 mb-2">{subreddit.name}</p>
          <p className="text-gray-700 text-sm mb-3 line-clamp-4">
            {subreddit.public_description || subreddit.description}
          </p>

          <div className="text-sm text-gray-600 mb-3">
            <span className="font-medium">Subscribers:</span>{' '}
            {subreddit.subscribers?.toLocaleString()}
          </div>

          {subreddit.allowed_media_in_comments!.length > 0 && (
            <div className="mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Allowed Media:
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {subreddit.allowed_media_in_comments!.map((media) => (
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

          <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
            {subreddit.over18 && (
              <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                NSFW
              </span>
            )}
            {subreddit.spoilers_enabled && (
              <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                Spoilers
              </span>
            )}
            {subreddit.restrict_posting && (
              <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                Restricted
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
