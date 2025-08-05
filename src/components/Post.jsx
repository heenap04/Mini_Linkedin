'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost, deletePost } from '../features/posts/postSlice';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default function Post({ post }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const userId = user?._id;
  const isPostLiked = post.likes.some((like) => like.toString() === userId);
  
  const handleLike = async () => {
    try {
      if (isPostLiked) {
        await dispatch(unlikePost(post._id)).unwrap();
      } else {
        await dispatch(likePost(post._id)).unwrap();
      }
    } catch (error) {
      toast.error(error);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        setIsDeleting(true);
        await dispatch(deletePost(post._id)).unwrap();
        toast.success('Post deleted');
      } catch (error) {
        toast.error(error);
        setIsDeleting(false);
      }
    }
  };
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
        <div>
          <Link 
            href={`/profile/${post.author._id}`}
            className="text-lg font-medium text-gray-900 hover:text-blue-600"
          >
            {post.author.name}
          </Link>
          <p className="mt-1 text-sm text-gray-500">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
        {userId === post.author._id && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 text-sm font-medium disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-between items-center">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 text-sm font-medium ${
            isPostLiked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          <svg
            className={`h-5 w-5 ${isPostLiked ? 'fill-current' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          <span>{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}</span>
        </button>
        <div className="text-sm text-gray-500">
          {post.comments?.length || 0} comments
        </div>
      </div>
    </div>
  );
}
