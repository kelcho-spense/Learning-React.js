import { useSuspenseQuery } from "@tanstack/react-query";
import Error from "./Error";
import Post from "./Post";
import { useState } from "react";
import PostModal from "./PostModal";

export interface TPost {
    id: number;
    title: string;
    body: string;
}

const fetchPosts = async (): Promise<TPost[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
}

function PostList() {
    const [selectedPost, setSelectedPost] = useState<TPost | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, error } = useSuspenseQuery<TPost[], Error>({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    if (error) {
        return <Error error={error} />;
    }


    const handleOpenModel = (post: TPost) => {
        console.log('Open modal for post:', post);
        // Logic to open modal can be implemented here
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map(post => <Post key={post.id} post={post} openModal={handleOpenModel} />)}
            {isModalOpen && selectedPost && (
                <PostModal
                    post={selectedPost}
                    closeModal={() => {
                        setIsModalOpen(false);
                        setSelectedPost(null);
                    }}
                />
            )}
        </div>
    )
}

export default PostList