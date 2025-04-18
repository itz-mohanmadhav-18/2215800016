import { useState, useEffect } from 'react';
import { getLatestPosts } from '../services/api';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getLatestPosts();
        
        console.log("Latest posts data:", data);
        
      
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Unexpected data format:", data);
          setPosts([]);
        }
      } catch (err) {
        console.error("Error in Feed:", err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
    

    const interval = setInterval(fetchPosts, 10000);
    return () => clearInterval(interval);
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
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <p className="mb-6 text-gray-600">See the most recent posts from users. This feed updates automatically every 10 seconds.</p>
      
      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts available at the moment.</p>
        ) : (
          posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              userName={`User ${post.userid}`}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Feed;