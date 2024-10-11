export default function ProfileInfo({ profileData }) {
  return (
    <div className="mb-8 overflow-hidden">
      <div className="block w-[80px] h-[80px] mx-auto mb-4">
        {profileData.profileImageUrl && (
          <img
            src={profileData.profileImageUrl}
            alt={profileData.name}
            className="w-full h-full rounded-full object-cover border-2 border-[#2D68FF]"
          />
        )}
        {!profileData.profileImageUrl && (
          <div className="w-full h-full rounded-full bg-white" />
        )}
      </div>

      <div className="flex flex-col flex-wrap gap-2 justify-center items-center">
        {profileData.name && (
          <p className="font-semibold text-sm opacity-80">{profileData.name}</p>
        )}
        {!profileData.name && (
          <div className="font-semibold rounded-lg py-[2px] text-sm bg-white w-full">
            <span className="opacity-0">Name</span>
          </div>
        )}

        {profileData.email && (
          <div className="flex justify-center items-center">
            <p className="text-[#6E6E6E] text-sm opacity-90">
              {profileData.email}
            </p>
          </div>
        )}
        {!profileData.email && (
          <div className="font-semibold rounded-lg py-[2px] text-sm bg-white w-full">
            <span className="opacity-0">Email</span>
          </div>
        )}
      </div>
    </div>
  );
}
