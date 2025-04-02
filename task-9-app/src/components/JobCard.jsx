'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { createBookmark, deleteBookmark } from '@/services/api';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';

const JobCard = ({ job, index }) => {
  const { user, bookmarks, loading: authLoading, updateBookmarks } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      setIsBookmarked(bookmarks.some(b => b.id === job.id));
    }
  }, [authLoading, bookmarks, job.id]);

  const handleBookmarkToggle = async (e) => {
    e.preventDefault(); // Prevent navigation when clicking the bookmark button
    e.stopPropagation(); // Stop event bubbling
    if (!user) {
      // Redirect to login if user is not authenticated
      window.location.href = '/login';
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (isBookmarked) {
        await deleteBookmark(job.id, token);
        updateBookmarks(bookmarks.filter(b => b.id !== job.id));
      } else {
        await createBookmark(job.id, token);
        updateBookmarks([...bookmarks, job]);
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative group">
      <Link href={`/jobs/${job.id}`} className="block">
        <div className="bg-white rounded-2xl p-6 shadow-md font-montserrat border border-[#EAECF0] hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="relative w-12 h-12">
              <Image
                src={job.logoUrl || '/placeholder-logo.png'}
                alt={`${job.orgName} logo`}
                fill
                className="rounded-xl object-cover"
              />
            </div>
            <div className="flex-1 font-montserrat">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.orgName} • {job.location.join(', ')}</p>
              </div>
              <p className="mt-4 text-gray-700 line-clamp-2">{job.description}</p>
              <div className="mt-4 flex gap-2">
                {job.categories.map((category, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-montserrat ${
                      index === 0 ? (
                        category === 'Education Access and Quality Improvement' ? 'bg-green-600 text-white' :
                        category === 'Youth Empowerment and Development' ? 'bg-orange-600 text-white' :
                        category === 'Orphanages and Child Welfare' ? 'bg-purple-600 text-white' :
                        'bg-gray-600 text-white'
                      ) : (
                        category === 'Education Access and Quality Improvement' ? 'border border-green-600 text-green-600' :
                        category === 'Youth Empowerment and Development' ? 'border border-orange-600 text-orange-600' :
                        category === 'Orphanages and Child Welfare' ? 'border border-purple-600 text-purple-600' :
                        'border border-gray-600 text-gray-600'
                      )
                    }`}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={handleBookmarkToggle}
          disabled={isLoading || authLoading}
          className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
            (isLoading || authLoading) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
        >
          {isBookmarked ? (
            <BookmarkSolid className="w-5 h-5 text-blue-600" />
          ) : (
            <BookmarkOutline className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
    </div>
  );
};

export default JobCard; 