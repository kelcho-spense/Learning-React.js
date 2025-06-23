import type { Profile } from "./interface"
import Loaders from "../../constants/Loaders";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useProfiles, useDeleteProfile } from "../../hooks/useProfiles";
import { useState } from "react";
import { toast } from "sonner";
import EditProfileModal from "./EditProfileModal";

function ProfileLists() {
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  // Use custom hook for fetching profiles
  const { data: profiles, isError, error, isLoading, isSuccess } = useProfiles();

  // Use custom hook for deleting profiles
  const deleteMutation = useDeleteProfile();

  // Show error toast when there's an error fetching profiles
  if (isError && error) {
    toast.error(`Failed to load profiles: ${error.message}`);
  }
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this profile?');
    if (!confirmDelete) return;

    try {
      await deleteMutation.mutateAsync(id.toString());
      console.log(`Profile ${id} deleted successfully`);
      toast.success('Profile deleted successfully!');
    } catch (error) {
      console.error('Error deleting profile:', error);
      toast.error('Failed to delete profile. Please try again.');
    }
  };

  const handleEdit = (profile: Profile) => setEditingProfile(profile);

  const handleCloseModal = () => setEditingProfile(null);

  return (
    <div className="bg-white shadow-md rounded-lg min-w-auto">
      <h3 className="text-2xl text-blue-400 m-2">ProfileLists</h3>
      {isLoading && <Loaders />}
      {isError && <p className="text-red-500 p-4">Error: {error?.message}</p>}
      {isSuccess && (
        <ul className="min-w-full grid grid-cols-3 gap-4">
          {profiles?.map((profile: Profile) => (
            <li
              className="mb-4 p-2 border rounded min-w-auto bg-gray-50 hover:bg-gray-100 transition-colors"
              key={profile.id}>
              <h4 className="font-semibold">{profile.firstName} {profile.lastName}</h4>
              <p>Email: {profile.email}</p>
              <p>Role: {profile.role}</p>
              <p>Created At: {new Date(profile.createdAt).toLocaleDateString()}</p>
              <p>Updated At: {new Date(profile.updatedAt).toLocaleDateString()}</p>
              {profile.student && (
                <div className="mt-2 p-2 bg-blue-50 rounded">
                  <h5 className="font-medium">Student Details:</h5>
                  <p>Enrollment Date: {new Date(profile.student.enrollmentDate).toLocaleDateString()}</p>
                  <p>Degree Program: {profile.student.degreeProgram}</p>
                  <p>GPA: {profile.student.gpa}</p>
                </div>
              )}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(profile)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors flex items-center gap-1"
                  disabled={deleteMutation.isPending}
                >
                  <MdEdit />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(profile.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors flex items-center gap-1"
                  disabled={deleteMutation.isPending}
                >
                  <MdDeleteForever />
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Profile Modal */}
      {editingProfile && (
        <EditProfileModal
          profile={editingProfile}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default ProfileLists