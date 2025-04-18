import { useState, useEffect } from 'react';
import { getTrendingPosts } from '../services/api';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';

function TrendingPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        setLoading(true);
        const data = await getTrendingPosts();
        
        console.log("Trending posts data:", data);
        
      
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Unexpected data format:", data);
          setPosts([]);
        }
      } catch (err) {
        console.error("Error in TrendingPosts:", err);
        setError('Failed to load trending posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrendingPosts();
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
      <h1 className="text-3xl font-bold mb-6">Trending Posts</h1>
      <p className="mb-6 text-gray-600">
        Posts with the highest number of comments. These are the most engaging conversations happening right now!
      </p>
      
      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No trending posts available at the moment.</p>
        ) : (
          posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              userName={`User ${post.userid}`}
              showCommentCount={true}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TrendingPosts;