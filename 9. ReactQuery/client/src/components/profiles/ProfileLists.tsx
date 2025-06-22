import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Profile } from "./interface"
import Loaders from "../../constants/Loaders";
import { getProfiles } from "../../api";
import { MdDeleteForever } from "react-icons/md";
import { queryClient } from "../../App";


function ProfileLists() {

  // // api call to get profiles
  // const getProfiles = async () => {
  //   return await fetch('http://localhost:8000/profiles')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     });
  // }

  // Queries
  const { data: profiles, isError, error, isLoading, isSuccess } = useQuery({ queryKey: ['profiles'], queryFn: getProfiles })



  const deleteMutation = useMutation(['deleteProfiles'], {
    mutationFn: (id: string) => fetch(`http://localhost:8000/profiles/${id}`, {
      method: 'DELETE',
    }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      console.log(`Profile ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg min-w-auto">
      <h3 className="text-2xl text-blue-400 m-2">ProfileLists</h3>
      {isLoading && <Loaders />}
      {isError && <p>Error: {error.message}</p>}
      {isSuccess && (
        <ul className="min-w-full grid grid-cols-3 gap-4">
          {profiles.map((profile: Profile) => (
            <li
              className="mb-4 p-2 border rounded min-w-auto bg-gray-50 hover:bg-gray-100 transition-colors"
              key={profile.id}>
              <h4>{profile.firstName} {profile.lastName}</h4>
              <p>Email: {profile.email}</p>
              <p>Role: {profile.role}</p>
              <p>Created At: {new Date(profile.createdAt).toLocaleDateString()}</p>
              <p>Updated At: {new Date(profile.updatedAt).toLocaleDateString()}</p>
              {profile.student && (
                <div>
                  <h5>Student Details:</h5>
                  <p>Enrollment Date: {new Date(profile.student.enrollmentDate).toLocaleDateString()}</p>
                  <p>Degree Program: {profile.student.degreeProgram}</p>
                  <p>GPA: {profile.student.gpa}</p>
                </div>
              )}
              <button
                onClick={() => handleDelete(profile.id)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                <MdDeleteForever />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProfileLists