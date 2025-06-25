import { createFileRoute, ErrorComponent } from '@tanstack/react-router'
import { getPost, getPostComments, type Comment } from '../api/Blogs'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import Loaders from '@/components/Loaders'

// Query options for post details
const postQueryOptions = (postId: string) => queryOptions({
  queryKey: ['post', postId],
  queryFn: () => getPost(postId),
  staleTime: 1000 * 60 * 5, // 5 minutes
})

// Query options for post comments
const commentsQueryOptions = (postId: string) => queryOptions({
  queryKey: ['comments', postId],
  queryFn: () => getPostComments(postId),
  staleTime: 1000 * 60 * 5, // 5 minutes
})

export const Route = createFileRoute('/blog/$postId')({
  loader: async ({ params, context }) => {
    // Prefetch both post and comments data
    const [post, comments] = await Promise.all([
      context.queryClient.ensureQueryData(postQueryOptions(params.postId)),
      context.queryClient.ensureQueryData(commentsQueryOptions(params.postId)),
    ])

    return { post, comments }
  },
  component: PostDetailComponent,
  errorComponent: ({ error }) => (
    <ErrorComponent error={error} />
  ),
  pendingComponent: () => <Loaders />,
})

function PostDetailComponent() {
  const { postId } = Route.useParams()

  // Use suspense queries to access the prefetched data
  const { data: post } = useSuspenseQuery(postQueryOptions(postId))
  const { data: comments } = useSuspenseQuery(commentsQueryOptions(postId))

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Post Details */}
      <article className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {post.title}
        </h1>
        <div className="text-sm text-gray-500 mb-6">
          Post ID: {post.id} | User ID: {post.userId}
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {post.body}
          </p>
        </div>
      </article>

      {/* Comments Section */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Comments ({comments.length})
        </h2>

        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No comments yet for this post.
          </p>
        ) : (
          <div className="space-y-6">
            {comments.map((comment: Comment) => (
              <div
                key={comment.id}
                className="border-l-4 border-blue-500 pl-6 py-4 bg-gray-50 rounded-r-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {comment.name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    #{comment.id}
                  </span>
                </div>
                <p className="text-blue-600 text-sm mb-2">
                  {comment.email}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {comment.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
