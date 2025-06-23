interface TPost {
  id: number;
  title: string;
  body: string;
}

function Post({ post, openModal }: { post: TPost, openModal: (post: TPost) => void }) {
  return (
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
  )
}

export default Post