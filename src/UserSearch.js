// UserSearch.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList';
import UserPanel from './UserPanel';
import Pagination from './Pagination';
import PageNumber from './PageNumber';
import Footer from './Footer';

const API_URL = 'https://api.github.com';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function UserSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchUsers = async () => {
      if (debouncedSearchTerm) {
        try {
          const response = await axios.get(
            `${API_URL}/search/users?q=${debouncedSearchTerm}&sort=followers&order=desc in:name type:User&page=${currentPage}`
          );
          const usersWithFollowers = response.data.items.map((user) => ({
            id: user.id,
            login: user.login,
            avatar_url: user.avatar_url,
          }));
          setUsers(usersWithFollowers);
          setTotalPages(Math.ceil(response.data.total_count / 30));
          setError('');
        } catch (error) {
          console.error(error);
          setError('An error occurred while fetching the users.');
        }
      }
    };

    fetchUsers();
  }, [debouncedSearchTerm, currentPage]);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setCurrentPage(1); // Reset page when performing a new search
  };

  const fetchUserDetails = async (login) => {
    try {
      const response = await axios.get(`${API_URL}/users/${login}`);
      const user = response.data;
      setSelectedUser(user);
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching user details.');
    }
  };

  const handleUserClick = (login) => {
    fetchUserDetails(login);
  };

  const handleClosePanel = () => {
    setSelectedUser(null);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${require('./assets/background.jpg')})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-5xl font-bold text-center text-white mb-5">Find the Star!</h1>
        <h6 className="text-1xl font-bold text-center text-white mb-3">(Github Edition)</h6>
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Enter the name of the user"
            className="w-full p-2 rounded-md shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {users.length > 0 && (
          <>
            <UserList users={users} handleUserClick={handleUserClick} />
            {selectedUser ? (
              <UserPanel user={selectedUser} onClosePanel={handleClosePanel} />
            ) : (
              <>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                  disabled={!!selectedUser} // Disable pagination buttons if user panel is open
                />
                <PageNumber currentPage={currentPage} totalPages={totalPages} />
              </>
            )}
          </>
        )}
        
      </div>

      <Footer />
    </div>
  );
}

export default UserSearch;
