import CommentsList from './CommentsList'
import type { TPost } from './PostList'

function PostModal({ post, closeModal }: { post: TPost, closeModal: () => void }) {


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                Post #{post.id}
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
                        {post.title}
                    </h1>                <div className="prose prose-gray max-w-none">
                        <p className="text-gray-700 leading-relaxed text-base mb-6">
                            {post.body}
                        </p>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments</h3>

                    </div>
                    <div className='max-h-60 overflow-y-auto'>
                        <CommentsList postId={post.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostModal