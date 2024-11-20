import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import PostList from "./PostList"; // Import the PostList component

const Profile = () => {
  const { user } = useContext(AuthContext); // Get user info from context
  const [posts, setPosts] = useState([]); // User's blog posts
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch user's blog posts
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await API.get(`/posts/my-posts/${user.id}`);
      setPosts(response.data);
    } catch (err) {
      setError("Failed to fetch posts. Please try again.");
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (postId) => {
    try {
      await API.delete(`/posts/${postId}`);
      toast.success("Post deleted successfully!");
      fetchPosts(); // Refresh the posts list
    } catch (err) {
      toast.error("Failed to delete the post.");
      console.error("Something went wrong, i guess", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* User Info Section */}
      <UserProfile user={user} />

      {/* Blog Posts Section */}
      <div className="flex-1 p-6 overflow-y-auto">
        {loading && <p className="text-gray-400">Loading posts...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <PostList fetchPosts={fetchPosts} posts={posts} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

// User Profile Component
const UserProfile = ({ user }) => (
  <div className="p-8 bg-gray-800 flex flex-col items-center">
    <img
      src="/avatar.png"
      alt="User Avatar"
      className="h-24 w-24 rounded-full mb-4"
    />
    <h2 className="text-2xl font-bold">{user.username}</h2>
    <p className="text-gray-400">{user.email}</p>
  </div>
);

export default Profile;
