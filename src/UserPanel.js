import React from "react";
function UserPanel({ user, onClosePanel }) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg max-w-lg p-4 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClosePanel}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="flex items-center mb-4">
            <img
              src={user.avatar_url}
              alt="User Avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
            <h2 className="text-xl font-bold">{user.login}</h2>
          </div>
          <p className="mb-2">
            <span className="font-semibold">Name:</span> {user.name || 'N/A'}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Location:</span> {user.location || 'N/A'}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Bio:</span> {user.bio || 'N/A'}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Public Repos:</span> {user.public_repos}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Followers:</span> {user.followers}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Following:</span> {user.following}
          </p>
        </div>
      </div>
    );
  }

  export default UserPanel;