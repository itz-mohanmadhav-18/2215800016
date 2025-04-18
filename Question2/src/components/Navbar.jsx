import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-blue-600">Social Media Analytics</span>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                  ? "px-3 py-2 rounded-md text-white bg-blue-500"
                  : "px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200"
              }
              end
            >
              Feed
            </NavLink>
            <NavLink 
              to="/trending" 
              className={({ isActive }) => 
                isActive 
                  ? "px-3 py-2 rounded-md text-white bg-blue-500"
                  : "px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200"
              }
            >
              Trending Posts
            </NavLink>
            <NavLink 
              to="/top-users" 
              className={({ isActive }) => 
                isActive 
                  ? "px-3 py-2 rounded-md text-white bg-blue-500"
                  : "px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200"
              }
            >
              Top Users
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;