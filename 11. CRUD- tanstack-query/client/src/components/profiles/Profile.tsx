import ProfileLists from './ProfileLists'
import RegistrationForm from './RegistrationForm'

function Profile() {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-lg gap-2">
      <RegistrationForm />
      <ProfileLists />
    </div>
  )
}

export default Profile