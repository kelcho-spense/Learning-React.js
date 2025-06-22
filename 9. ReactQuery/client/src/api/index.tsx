import type { FormData } from '../components/profiles/RegistrationForm';
const url = 'http://localhost:8000';

export const getProfiles = async () => {
  return await fetch(`${url}/profiles`)
    .then((response) => {
      return response.json()
    })
};

export const createProfile = async (profileData: FormData) => {
  return await fetch(`${url}/profiles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  }).then(response => {
    return response.json();
  });
}

