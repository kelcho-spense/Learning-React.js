import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import type {
    UseMutationResult,
    UseQueryResult
} from '@tanstack/react-query';
import {
    getProfiles,
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
} from '../api';
import type { UpdateProfileData } from '../api';
import type { Profile } from '../components/profiles/interface';
import type { FormData } from '../components/profiles/RegistrationForm';

// Simple query keys
export const profileKeys = {
    all: ['profiles'] as const,
    detail: (id: string) => ['profiles', id] as const,
} as const;

// Custom hook for fetching all profiles
export const useProfiles = (): UseQueryResult<Profile[], Error> => {
    return useQuery({
        queryKey: profileKeys.all,
        queryFn: getProfiles,
    });
};

// Custom hook for fetching a single profile
export const useProfile = (id: string): UseQueryResult<Profile, Error> => {
    return useQuery({
        queryKey: profileKeys.detail(id),
        queryFn: () => getProfile(id),
        enabled: !!id,
    });
};

// Custom hook for creating a profile
export const useCreateProfile = (): UseMutationResult<Profile, Error, FormData> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProfile,
        onSuccess: () => {
            // Just invalidate - let React Query handle the rest
            queryClient.invalidateQueries({ queryKey: profileKeys.all });
        },
    });
};

// Custom hook for updating a profile
export const useUpdateProfile = (): UseMutationResult<Profile, Error, UpdateProfileData> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            // Just invalidate - let React Query handle the rest
            queryClient.invalidateQueries({ queryKey: profileKeys.all });
        },
    });
};

// Custom hook for deleting a profile
export const useDeleteProfile = (): UseMutationResult<void, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProfile,
        onSuccess: () => {
            // Just invalidate - let React Query handle the rest
            queryClient.invalidateQueries({ queryKey: profileKeys.all });
        },
    });
};
