import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loaders from "./constants/Loaders";

interface TPost {
  id: number;
  title: string;
  body: string;
}

interface TComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const fetchPosts = async (): Promise<TPost[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

const fetchComments = async (postId: number): Promise<TComment[]> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
}

function App() {
  const [selectedPost, setSelectedPost] = useState<TPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
// useSuspenseQuery gurantees that the data is available before rendering
  // This is useful for avoiding loading states in the UI
  const { data: posts, isPending, error, refetch, isFetching } = useSuspenseQuery<TPost[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const { data: comments, isPending: isPendingComments, error: errorComments } = useQuery<TComment[], Error>({
    queryKey: ['comments', selectedPost?.id],
    queryFn: () => fetchComments(selectedPost!.id),
    enabled: !!selectedPost, // Only run when selectedPost exists
  });


  const openModal = (post: TPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">        <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">React Query Demo</h1>
        <p className="text-lg text-gray-600 mb-6">Fetching posts with React Query</p>

        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isFetching
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
            }`}
        >
          {isFetching ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Refreshing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Posts
            </>
          )}
        </button>
      </header>

        {isPending ? (
          <div className="flex justify-center">
            <Loaders />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Post #{post.id}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.body}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => openModal(post)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
                    >
                      Read more →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      Post #{selectedPost.id}
                    </span>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  {selectedPost.title}
                </h1>                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base mb-6">
                    {selectedPost.body}
                  </p>
                </div>

                {/* Comments Section */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments</h3>

                  {errorComments ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-700 text-sm">Failed to load comments: {errorComments.message}</p>
                    </div>
                  ) : isPendingComments ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : comments && comments.length > 0 ? (
                    <div className="space-y-4 max-h-60 overflow-y-auto">
                      {comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900 text-sm">{comment.name}</h4>
                            <span className="text-xs text-gray-500">{comment.email}</span>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">{comment.body}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm text-center py-8">No comments available for this post.</p>
                  )}
                </div>                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end space-x-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200">
                    Share Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App