import { getRandomAvatar } from '../utils/helpers';

function UserCard({ userId, name, postCount, rank }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
      <div className="relative">
        <img 
          src={getRandomAvatar(userId)} 
          alt={`${name}'s avatar`} 
          className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
        />
        <div className="absolute -top-2 -left-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
          {rank}
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex items-center mt-1">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {postCount} {postCount === 1 ? 'post' : 'posts'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserCard;