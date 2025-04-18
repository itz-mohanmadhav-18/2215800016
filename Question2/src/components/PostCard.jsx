import { useState } from 'react';
import { formatDate } from '../utils/helpers';

function PostCard({ post, userName, showCommentCount = false }) {
  const [expanded, setExpanded] = useState(false);
  
  if (!post || typeof post !== 'object') {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <p>No post data available</p>
      </div>
    );
  }
  
 
  const content = post.content || '';
 
  const title = post.title || content.split(' ').slice(0, 3).join(' ');
  
  const body = post.body || content;
  const userId = post.userid || 0;
  const commentCount = post.commentCount || 0;
  
  
  const avatarColor = `hsl(${(userId * 137) % 360}, 70%, 80%)`;
  const postColor = `hsl(${(post.id * 97) % 360}, 60%, 75%)`;
  const userInitial = (userName && userName[0]) || 'U';
  
  const timestamp = post.timestamp || new Date().toISOString();
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
     
      <div className="p-4 flex items-center">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: avatarColor }}
        >
          {userInitial}
        </div>
        <div className="ml-3">
          <h3 className="font-semibold">{userName || 'Unknown User'}</h3>
          <p className="text-xs text-gray-500">{formatDate(timestamp)}</p>
        </div>
      </div>
      
      
      <div 
        className="w-full h-48 flex items-center justify-center text-white text-xl font-bold p-4 text-center"
        style={{ backgroundColor: postColor }}
      >
        {title}
      </div>
      
      
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        {body && (
          <>
            <p className="text-gray-700">
              {expanded || body.length <= 100 ? body : `${body.substring(0, 100)}...`}
            </p>
            {body.length > 100 && (
              <button 
                onClick={() => setExpanded(!expanded)}
                className="text-blue-500 hover:underline mt-2 text-sm"
              >
                {expanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </>
        )}
        
       
        {showCommentCount && (
          <div className="mt-4 flex items-center">
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCard;