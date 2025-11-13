import React, { useContext, useState } from 'react';



const Profile = () => {

  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !photoURL.trim()) {
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await updateUserProfile({
        displayName: name,
        photoURL: photoURL
      });
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile');
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#3e3e5a] mb-6 text-center">My Profile</h1>

        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center text-sm">
            {message}
          </div>
        )}

        {!isEditing ? (
          <div className="space-y-6">
            <div>
              <img
                src={user?.photoURL || 'https://i.postimg.cc/RVgJYLjg/avatar-placeholder.png'}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto border-4 border-[#C1C1ED] object-cover"
                onError={(e) => {
                  e.target.src = 'https://i.postimg.cc/RVgJYLjg/avatar-placeholder.png';
                }}
              />
            </div>

            <div className="border-b border-[#FFEFF3] pb-4">
              <p className="text-sm text-[#3e3e5a]/60 mb-1">Name</p>
              <p className="text-lg font-semibold text-[#3e3e5a]">
                {user?.displayName || 'Not provided'}
              </p>
            </div>

            <div className="border-b border-[#FFEFF3] pb-4">
              <p className="text-sm text-[#3e3e5a]/60 mb-1">Email</p>
              <p className="text-lg font-semibold text-[#3e3e5a] break-all">{user?.email}</p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-[#C1C1ED] hover:bg-[#b2b2e0] text-[#3e3e5a] font-semibold py-2 rounded-xl transition duration-300"
            >
              Update Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-[#3e3e5a] font-semibold mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#C1C1ED]/30 rounded-lg focus:outline-none focus:border-[#C1C1ED] text-[#3e3e5a]"
                required
              />
            </div>

            <div>
              <label className="block text-[#3e3e5a] font-semibold mb-2 text-sm">
                Photo URL
              </label>
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#C1C1ED]/30 rounded-lg focus:outline-none focus:border-[#C1C1ED] text-[#3e3e5a]"
                required
              />
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 border-2 border-[#C1C1ED] text-[#3e3e5a] font-semibold py-2 rounded-lg hover:bg-[#FFEFF3] transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#C1C1ED] hover:bg-[#b2b2e0] disabled:bg-[#C1C1ED]/50 text-[#3e3e5a] font-semibold py-2 rounded-lg transition"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;