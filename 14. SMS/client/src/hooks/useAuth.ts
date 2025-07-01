import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import type {
    UseMutationResult,
} from '@tanstack/react-query';

import { login } from '@/api/auth';
import type { TLoginResponse } from '@/types';
import type { FormData } from '@/routes/login';

export const useLogin = (): UseMutationResult<TLoginResponse, Error, FormData> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ email, password }) => login(email, password),
        onSuccess: (data) => {
            // Store the token in localStorage or context
            localStorage.setItem('token', data.token.accessToken);
            localStorage.setItem('refreshToken', data.token.refreshToken);
            // Optionally store user info
            queryClient.setQueryData(['user'], data.user);
        },
        onError: (error) => {
            console.error('Login failed:', error.message);
            // Clear any existing tokens on error
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        },
    });
} 