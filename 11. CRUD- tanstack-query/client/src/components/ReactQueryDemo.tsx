import { useState } from 'react';
import {
    useProfiles,
    useProfile,
    useCreateProfile,
    useUpdateProfile,
    useDeleteProfile,
    useOptimisticUpdateProfile,
    profileKeys
} from '../hooks/useProfiles';
import { useQueryClient } from '@tanstack/react-query';
import type { Profile } from './profiles/interface';

/**
 * Advanced React Query Demo Component
 * 
 * This component demonstrates various React Query v5 patterns:
 * - Query fetching with different states
 * - Mutations (create, update, delete)
 * - Optimistic updates
 * - Manual cache manipulation
 * - Query invalidation
 * - Prefetching
 * - Background refetching
 */
function ReactQueryDemo() {
    const [selectedProfileId, setSelectedProfileId] = useState<string>('');
    const [showOptimistic, setShowOptimistic] = useState(false);

    const queryClient = useQueryClient();

    // Queries
    const profilesQuery = useProfiles();
    const profileQuery = useProfile(selectedProfileId);

    // Mutations
    const createMutation = useCreateProfile();
    const updateMutation = useUpdateProfile();
    const deleteMutation = useDeleteProfile();
    const optimisticUpdateMutation = useOptimisticUpdateProfile();

    // Manual cache operations
    const handlePrefetchProfile = async (id: string) => {
        await queryClient.prefetchQuery({
            queryKey: profileKeys.detail(id),
            queryFn: () => fetch(`http://localhost:8000/profiles/${id}`).then(res => res.json()),
            staleTime: 5 * 60 * 1000,
        });
    };

    const handleInvalidateQueries = () => {
        queryClient.invalidateQueries({ queryKey: profileKeys.all });
    };

    const handleRefetchQueries = () => {
        queryClient.refetchQueries({ queryKey: profileKeys.lists() });
    };

    const handleResetQueries = () => {
        queryClient.resetQueries({ queryKey: profileKeys.all });
    };

    const handleSetQueryData = () => {
        // Manually set cache data
        queryClient.setQueryData(profileKeys.lists(), (oldData: Profile[] | undefined) => {
            return oldData ? [...oldData, {
                id: 'temp-id',
                firstName: 'Cached',
                lastName: 'User',
                email: 'cached@example.com',
                role: 'guest',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }] : [];
        });
    };

    const handleRemoveQueries = () => {
        queryClient.removeQueries({ queryKey: profileKeys.all });
    };

    // Create a sample profile
    const handleCreateSample = () => {
        createMutation.mutate({
            firstName: 'Sample',
            lastName: 'User',
            email: `sample-${Date.now()}@example.com`,
            role: 'student',
        });
    };

    // Update profile with optimistic updates
    const handleOptimisticUpdate = () => {
        if (!selectedProfileId) return;

        optimisticUpdateMutation.mutate({
            id: selectedProfileId,
            firstName: 'Optimistic',
            lastName: 'Update',
            email: 'optimistic@example.com',
            role: 'faculty',
        });
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">React Query v5 CRUD Demo</h1>

            {/* Query States Demo */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Query States</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded">
                        <h3 className="font-medium">Profiles Query State</h3>
                        <ul className="text-sm mt-2 space-y-1">
                            <li>Status: <span className="font-mono">{profilesQuery.status}</span></li>
                            <li>Is Loading: <span className="font-mono">{String(profilesQuery.isLoading)}</span></li>
                            <li>Is Error: <span className="font-mono">{String(profilesQuery.isError)}</span></li>
                            <li>Is Success: <span className="font-mono">{String(profilesQuery.isSuccess)}</span></li>
                            <li>Is Fetching: <span className="font-mono">{String(profilesQuery.isFetching)}</span></li>
                            <li>Is Stale: <span className="font-mono">{String(profilesQuery.isStale)}</span></li>
                            <li>Data Length: <span className="font-mono">{profilesQuery.data?.length || 0}</span></li>
                        </ul>
                    </div>

                    <div className="p-4 border rounded">
                        <h3 className="font-medium">Single Profile Query State</h3>
                        <select
                            value={selectedProfileId}
                            onChange={(e) => setSelectedProfileId(e.target.value)}
                            className="w-full p-2 border rounded mb-2"
                        >
                            <option value="">Select a profile...</option>
                            {profilesQuery.data?.map((profile: Profile) => (
                                <option key={profile.id} value={profile.id}>
                                    {profile.firstName} {profile.lastName}
                                </option>
                            ))}
                        </select>
                        <ul className="text-sm space-y-1">
                            <li>Status: <span className="font-mono">{profileQuery.status}</span></li>
                            <li>Is Loading: <span className="font-mono">{String(profileQuery.isLoading)}</span></li>
                            <li>Is Error: <span className="font-mono">{String(profileQuery.isError)}</span></li>
                            <li>Is Success: <span className="font-mono">{String(profileQuery.isSuccess)}</span></li>
                            <li>Data: <span className="font-mono">{profileQuery.data?.email || 'N/A'}</span></li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Mutation States Demo */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Mutation States</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 border rounded">
                        <h3 className="font-medium">Create Mutation</h3>
                        <ul className="text-sm mt-2 space-y-1">
                            <li>Status: <span className="font-mono">{createMutation.status}</span></li>
                            <li>Is Pending: <span className="font-mono">{String(createMutation.isPending)}</span></li>
                            <li>Is Error: <span className="font-mono">{String(createMutation.isError)}</span></li>
                            <li>Is Success: <span className="font-mono">{String(createMutation.isSuccess)}</span></li>
                        </ul>
                        <button
                            onClick={handleCreateSample}
                            disabled={createMutation.isPending}
                            className="mt-2 px-3 py-1 bg-green-500 text-white rounded disabled:bg-gray-400"
                        >
                            {createMutation.isPending ? 'Creating...' : 'Create Sample'}
                        </button>
                    </div>

                    <div className="p-4 border rounded">
                        <h3 className="font-medium">Update Mutation</h3>
                        <ul className="text-sm mt-2 space-y-1">
                            <li>Status: <span className="font-mono">{updateMutation.status}</span></li>
                            <li>Is Pending: <span className="font-mono">{String(updateMutation.isPending)}</span></li>
                            <li>Is Error: <span className="font-mono">{String(updateMutation.isError)}</span></li>
                            <li>Is Success: <span className="font-mono">{String(updateMutation.isSuccess)}</span></li>
                        </ul>
                    </div>

                    <div className="p-4 border rounded">
                        <h3 className="font-medium">Delete Mutation</h3>
                        <ul className="text-sm mt-2 space-y-1">
                            <li>Status: <span className="font-mono">{deleteMutation.status}</span></li>
                            <li>Is Pending: <span className="font-mono">{String(deleteMutation.isPending)}</span></li>
                            <li>Is Error: <span className="font-mono">{String(deleteMutation.isError)}</span></li>
                            <li>Is Success: <span className="font-mono">{String(deleteMutation.isSuccess)}</span></li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Advanced Patterns */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Advanced Patterns</h2>
                <div className="space-y-4">

                    {/* Optimistic Updates */}
                    <div className="p-4 border rounded">
                        <h3 className="font-medium mb-2">Optimistic Updates</h3>
                        <p className="text-sm text-gray-600 mb-2">
                            Updates the UI immediately before the server responds, then rolls back if there's an error.
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowOptimistic(!showOptimistic)}
                                className="px-3 py-1 bg-blue-500 text-white rounded"
                            >
                                {showOptimistic ? 'Hide' : 'Show'} Optimistic Demo
                            </button>
                            {showOptimistic && (
                                <button
                                    onClick={handleOptimisticUpdate}
                                    disabled={!selectedProfileId || optimisticUpdateMutation.isPending}
                                    className="px-3 py-1 bg-purple-500 text-white rounded disabled:bg-gray-400"
                                >
                                    Apply Optimistic Update
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Cache Management */}
                    <div className="p-4 border rounded">
                        <h3 className="font-medium mb-2">Cache Management</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                            <button
                                onClick={handleInvalidateQueries}
                                className="px-2 py-1 bg-yellow-500 text-white rounded text-xs"
                            >
                                Invalidate
                            </button>
                            <button
                                onClick={handleRefetchQueries}
                                className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                            >
                                Refetch
                            </button>
                            <button
                                onClick={handleResetQueries}
                                className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                            >
                                Reset
                            </button>
                            <button
                                onClick={handleSetQueryData}
                                className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                            >
                                Set Data
                            </button>
                            <button
                                onClick={handleRemoveQueries}
                                className="px-2 py-1 bg-gray-500 text-white rounded text-xs"
                            >
                                Remove
                            </button>
                            <button
                                onClick={() => selectedProfileId && handlePrefetchProfile(selectedProfileId)}
                                disabled={!selectedProfileId}
                                className="px-2 py-1 bg-indigo-500 text-white rounded text-xs disabled:bg-gray-400"
                            >
                                Prefetch
                            </button>
                        </div>
                    </div>

                    {/* Query Keys */}
                    <div className="p-4 border rounded">
                        <h3 className="font-medium mb-2">Query Keys Structure</h3>
                        <div className="text-sm font-mono bg-gray-100 p-2 rounded">
                            <div>profileKeys.all: {JSON.stringify(profileKeys.all)}</div>
                            <div>profileKeys.lists(): {JSON.stringify(profileKeys.lists())}</div>
                            <div>profileKeys.details(): {JSON.stringify(profileKeys.details())}</div>
                            {selectedProfileId && (
                                <div>profileKeys.detail('{selectedProfileId}'): {JSON.stringify(profileKeys.detail(selectedProfileId))}</div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Error Handling */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Error Handling</h2>
                <div className="space-y-2">
                    {profilesQuery.isError && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            <strong>Profiles Query Error:</strong> {profilesQuery.error?.message}
                        </div>
                    )}
                    {profileQuery.isError && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            <strong>Profile Query Error:</strong> {profileQuery.error?.message}
                        </div>
                    )}
                    {createMutation.isError && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            <strong>Create Mutation Error:</strong> {createMutation.error?.message}
                        </div>
                    )}
                    {updateMutation.isError && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            <strong>Update Mutation Error:</strong> {updateMutation.error?.message}
                        </div>
                    )}
                    {deleteMutation.isError && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            <strong>Delete Mutation Error:</strong> {deleteMutation.error?.message}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default ReactQueryDemo;
