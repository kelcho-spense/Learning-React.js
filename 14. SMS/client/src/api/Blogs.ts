const url = 'https://jsonplaceholder.typicode.com';

// Type for Post
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// Type for Comment
export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

// Type for creating/updating posts
export type PostFormData = Omit<Post, 'id'>;

// Type for update operations (FormData + id)
export type UpdatePostData = PostFormData & { id: string };

// Helper function to handle API responses and errors
const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}: ${response.statusText}`;

    try {
      // Try to parse as JSON first
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } else {
        // If not JSON, try to read as text
        const errorText = await response.text();
        if (errorText) {
          errorMessage = errorText;
        }
      }
    } catch (parseError) {
      // If parsing fails, use the default error message
      console.warn('Failed to parse error response:', parseError);
    }

    throw new Error(errorMessage);
  }
  return response;
};

// GET all posts
export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${url}/posts`);
  await handleApiResponse(response);
  return response.json();
};

// GET single post by ID
export const getPost = async (id: string): Promise<Post> => {
  const response = await fetch(`${url}/posts/${parseInt(id)}`);
  await handleApiResponse(response);
  return response.json();
};

// CREATE new post
export const createPost = async (postData: PostFormData): Promise<Post> => {
  const response = await fetch(`${url}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  await handleApiResponse(response);
  return response.json();
};

// UPDATE existing post
export const updatePost = async ({ id, ...postData }: UpdatePostData): Promise<Post> => {
  // Convert string ID to number for server
  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    throw new Error(`Invalid post ID: ${id}`);
  }

  console.log('Updating post with ID:', numericId, 'Data:', postData); // Debug log

  const response = await fetch(`${url}/posts/${numericId}`, {
    method: 'PUT', // JSONPlaceholder uses PUT for updates
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...postData, id: numericId }),
  });

  await handleApiResponse(response);
  return response.json();
};

// DELETE post
export const deletePost = async (id: string): Promise<void> => {
  // Convert string ID to number for server
  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    throw new Error(`Invalid post ID: ${id}`);
  }

  console.log('Deleting post with ID:', numericId); // Debug log

  const response = await fetch(`${url}/posts/${numericId}`, {
    method: 'DELETE',
  });

  await handleApiResponse(response);
  // DELETE typically returns no content, so we don't parse JSON
};

// GET comments for a specific post
export const getPostComments = async (postId: string): Promise<Comment[]> => {
  const response = await fetch(`${url}/posts/${parseInt(postId)}/comments`);
  await handleApiResponse(response);
  return response.json();
};

// GET all comments
export const getAllComments = async (): Promise<Comment[]> => {
  const response = await fetch(`${url}/comments`);
  await handleApiResponse(response);
  return response.json();
};
