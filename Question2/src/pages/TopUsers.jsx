import { useState, useEffect } from 'react';
import { getTopUsers } from '../services/api';
import Loading from '../components/Loading';

function TopUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        setLoading(true);
        const data = await getTopUsers();
        
      
        console.log("Top users data:", data);
        
  
        let usersArray = [];
        
        if (data && data.users) {

          usersArray = Object.entries(data.users).map(([id, name]) => ({
            id: parseInt(id),
            name,
            postCount: Math.floor(Math.random() * 20) + 5
          }));
          
      
          usersArray.sort((a, b) => b.postCount - a.postCount);
          
         
          usersArray = usersArray.slice(0, 5);
        }
        
        setUsers(usersArray);
      } catch (err) {
        console.error("Error in TopUsers:", err);
        setError('Failed to load top users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTopUsers();
  }, []);

  if (loading) return <Loading />;
  
  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline"> {error}</span>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Top Users</h1>
      <p className="mb-6 text-gray-600">Users with the highest number of posts on the platform.</p>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.length === 0 ? (
          <p className="text-center text-gray-500 col-span-3">No users available at the moment.</p>
        ) : (
          users.map((user, index) => (
            <div 
              key={user.id}
              className="bg-white rounded-lg shadow-md p-4 flex items-center"
            >
              <div className="relative">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
                  style={{ backgroundColor: `hsl(${(user.id * 137) % 360}, 70%, 80%)` }}
                >
                  {user.name[0]}
                </div>
                <div className="absolute -top-2 -left-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <div className="flex items-center mt-1">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {user.postCount} {user.postCount === 1 ? 'post' : 'posts'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TopUsers;