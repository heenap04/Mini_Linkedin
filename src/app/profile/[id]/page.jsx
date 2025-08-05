'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts } from '../../../features/posts/postSlice';
import { getOtherUser } from '../../../features/users/userSlice';
import Post from '../../../components/Post';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';

export default function ProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { userPosts, isLoading: isLoadingPosts } = useSelector((state) => state.posts);
  const { currentUser, isLoading: isLoadingUser } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  
  const isCurrentUser = user && user._id === id;
  
  useEffect(() => {
    if (id) {
      dispatch(getOtherUser(id));
      dispatch(getUserPosts(id));
    }
  }, [dispatch, id]);
  
  if (isLoadingUser || isLoadingPosts) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h3 className="mt-2 text-lg font-medium text-gray-900">User not found</h3>
            <p className="mt-1 text-sm text-gray-500">
              The user you're looking for doesn't exist or has been deleted.
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go back home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {currentUser.name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {currentUser.email}
                </p>
              </div>
              {isCurrentUser && (
                <Link
                  href="/profile/edit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Edit Profile
                </Link>
              )}
            </div>
            
            {currentUser.bio && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-500">About</h4>
                <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                  {currentUser.bio}
                </p>
              </div>
            )}
            
            <div className="mt-5 border-t border-gray-200 pt-5">
              <div className="flex space-x-6">
                <div className="text-center">
                  <span className="text-gray-900 font-medium">
                    {userPosts.length}
                  </span>
                  <span className="block text-sm text-gray-500">
                    {userPosts.length === 1 ? 'Post' : 'Posts'}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-gray-900 font-medium">
                    {currentUser.followers?.length || 0}
                  </span>
                  <span className="block text-sm text-gray-500">
                    {currentUser.followers?.length === 1 ? 'Follower' : 'Followers'}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-gray-900 font-medium">
                    {currentUser.following?.length || 0}
                  </span>
                  <span className="block text-sm text-gray-500">Following</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* User's Posts */}
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {isCurrentUser ? 'Your Posts' : 'Posts'}
        </h3>
        
        <div className="space-y-4">
          {userPosts.length > 0 ? (
            userPosts.map((post) => <Post key={post._id} post={post} />)
          ) : (
            <div className="text-center py-12 bg-white shadow rounded-lg">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No posts yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                {isCurrentUser 
                  ? 'Get started by creating your first post.'
                  : `${currentUser.name} hasn't posted anything yet.`}
              </p>
              {isCurrentUser && (
                <div className="mt-6">
                  <Link
                    href="/"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create Post
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
