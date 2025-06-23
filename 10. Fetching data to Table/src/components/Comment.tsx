
export interface TComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
function Comment({ comment }: { comment: TComment }) {
  return (
    <div key={comment.id} className="bg-gray-100 rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 text-sm">{comment.name}</h4>
        <span className="text-xs text-gray-500">{comment.email}</span>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{comment.body}</p>
    </div>
  )
}

export default Comment