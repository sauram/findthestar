import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import UserPanel from './UserPanel';

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
            `https://api.github.com/search/users?q=${debouncedSearchTerm}&sort=followers&order=desc in:name type:User&page=${currentPage}`
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
      const response = await axios.get(`https://api.github.com/users/${login}`);
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
        <div className="container mx-auto p-4">
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

            {selectedUser && (
              <UserPanel user={selectedUser} onClosePanel={handleClosePanel} />
            )}

          
              <div className="flex justify-center mt-4">
                <button
                  className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-l ${
                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <button
                  className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-r ${
                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <p className="text-gray-500 text-sm">
                  Page {currentPage} of {totalPages}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <footer className="bg-black py-4">
        <div className="container mx-auto flex justify-center items-center">
          <p className="text-white">Made by Saurabh Singh Gautam @2023</p>
          
          <div className="flex ml-4">
            <a
              href="https://www.linkedin.com/in/saurabhsinghgautam228/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2 hover:text-gray-400"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a
              href="https://github.com/sauram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2 hover:text-gray-400"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default UserSearch;
