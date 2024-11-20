// Home.js
import React, { useState, useEffect } from 'react';
import API from '../api/api'; // Assuming API utility for making requests

const Home = () => {
  const [posts, setPosts] = useState([]);

  // Fetch all posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await API.get('/posts');  // Make an API call to fetch posts
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl text-center font-bold mb-6 text-white">All Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length === 0 ? (
          <p className="text-center text-white">No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="bg-[#1F2937] p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2 text-gray-300">{post.title}</h2>
              <p className="text-gray-400 mb-4">{post.content}</p>
              <div className="flex flex-wrap">
                {post.tags && post.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-200 text-blue-800 text-xs font-medium mr-2 mb-2 px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
