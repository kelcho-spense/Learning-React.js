import type { FormData } from '../components/profiles/RegistrationForm';
import type { Profile } from '../components/profiles/interface';

const url = 'http://localhost:8000';

// Type for update operations (FormData + id)
export type UpdateProfileData = FormData & { id: string };

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

// GET all profiles
export const getProfiles = async (): Promise<Profile[]> => {
  const response = await fetch(`${url}/profiles`);
  await handleApiResponse(response);
  return response.json();
};

// GET single profile by ID
export const getProfile = async (id: string): Promise<Profile> => {
  const response = await fetch(`${url}/profiles/${parseInt(id)}`);
  await handleApiResponse(response);
  return response.json();
};

// CREATE new profile
export const createProfile = async (profileData: FormData): Promise<Profile> => {
  const response = await fetch(`${url}/profiles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });

  await handleApiResponse(response);
  return response.json();
};

// UPDATE existing profile
export const updateProfile = async ({ id, ...profileData }: UpdateProfileData): Promise<Profile> => {
  // Convert string ID to number for server
  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    throw new Error(`Invalid profile ID: ${id}`);
  }

  console.log('Updating profile with ID:', numericId, 'Data:', profileData); // Debug log

  const response = await fetch(`${url}/profiles/${numericId}`, {
    method: 'PATCH', // Using PATCH to match server
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });

  await handleApiResponse(response);
  return response.json();
};

// DELETE profile
export const deleteProfile = async (id: string): Promise<void> => {
  // Convert string ID to number for server
  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    throw new Error(`Invalid profile ID: ${id}`);
  }

  console.log('Deleting profile with ID:', numericId); // Debug log

  const response = await fetch(`${url}/profiles/${numericId}`, {
    method: 'DELETE',
  });

  await handleApiResponse(response);
  // DELETE typically returns no content, so we don't parse JSON
};

