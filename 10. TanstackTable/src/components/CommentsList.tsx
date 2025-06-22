import { useQuery } from '@tanstack/react-query';
import Error from './Error';
import Loaders from '../constants/Loaders';
import Comment from './Comment';

export interface TComment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}

function CommentsList({ postId }: { postId: number }) {

    const fetchComments = async (postId: number): Promise<TComment[]> => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        return response.json();
    }


    const { data: comments, isLoading, error } = useQuery<TComment[], Error>({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId),
        enabled: !!postId, // Only fetch comments if postId is provided
    });

    return (
        <div className="mt-2 pt-2 border-gray-100 flex flex-col gap-2 justify-end space-x-3" >
            {
                error && <Error error={error} />
            }
            {isLoading ? <Loaders /> :

                comments?.map(comment => (
                    <Comment

                        key={comment.id} comment={comment} />
                ))
            }
        </div>
    )
}

export default CommentsList