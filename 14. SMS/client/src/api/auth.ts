
const url = 'http://localhost:8000/api/v1';

// Helper function to handle API responses and errors
const handleApiResponse = async (response: Response) => {
    if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}: ${response.statusText}`;

        try {
            // Try to parse as JSON first
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json();

                // Check if there's a nested response object (NestJS error format)
                if (errorData.response && errorData.response.message) {
                    errorMessage = errorData.response.message;
                } else if (errorData.message) {
                    errorMessage = errorData.message;
                } else if (errorData.error) {
                    errorMessage = errorData.error;
                }

                // Make error messages more user-friendly
                if (errorMessage.toLowerCase().includes('not found')) {
                    if (errorMessage.includes('email')) {
                        errorMessage = 'No account found with this email address. Please check your email or sign up for a new account.';
                    }
                } else if (response.status === 401) {
                    errorMessage = 'Invalid email or password. Please try again.';
                } else if (response.status === 400) {
                    errorMessage = errorMessage || 'Please check your input and try again.';
                }
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

export const login = async (email: string, password: string) => {
    const response = await fetch(`${url}/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    await handleApiResponse(response);
    return response.json();
}