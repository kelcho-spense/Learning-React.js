import { createFileRoute } from '@tanstack/react-router'
import { getPosts } from '../api/Blogs'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import Post from '@/components/Post'

const postsQueryOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: () => getPosts(),
})

export const Route = createFileRoute('/blogs')({
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQueryOptions),
  component: RouteComponent,
})

function RouteComponent() {
  const { data: posts } = useSuspenseQuery(postsQueryOptions)

  return (
    <div>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  )
}
