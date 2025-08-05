'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../features/posts/postSlice';
import { getMe } from '../features/auth/authSlice';
import Post from '../components/Post';
import Navbar from '../components/Navbar';

export default function Home() {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getPosts());
    if (user) {
      dispatch(getMe());
    }
  }, [dispatch, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      return;
    }

    try {
      await dispatch(createPost({ content })).unwrap();
      setContent('');
      dispatch(getPosts()); // Refresh the posts
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {user && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    What's on your mind?
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="content"
                      name="content"
                      rows={3}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      placeholder="Share your thoughts..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => <Post key={post._id} post={post} />)
          ) : (
            <div className="text-center py-12">
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
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No posts</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new post.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
