// UserList.js
import React from 'react';

function UserList({ users, handleUserClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white rounded-md shadow-md p-4 cursor-pointer"
          onClick={() => handleUserClick(user.login)}
        >
          <img src={user.avatar_url} alt="User Avatar" className="w-24 h-24 rounded-full mx-auto mb-4" />
          <p className="text-center font-bold text-lg">{user.login}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;
