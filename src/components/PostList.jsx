import React from "react";
import API from "../api/api";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";

const PostList = ({ posts, fetchPosts, setCurrentPost }) => {
  const navigate = useNavigate()
  const handleDelete = async (postId) => {
    try {
      const respo = await API.delete(`/posts/${postId}`);
      toast.success("Deleting item done");
      navigate("/");
    } catch (err) {
      console.error(err.response.data.message);
      toast.error('something went wrong')
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Post List</h2>
        {posts.length === 0 ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                key={post._id}
              >
                <h3 className="text-2xl font-semibold mb-3 text-indigo-400">
                  {post.title}
                </h3>
                <p className="text-gray-300 mb-4">{post.content}</p>
                <div className="flex flex-wrap gap-2 mb-4 justify-between">
                  <div className="gap-x-5">

                  {post.tags.map((tag, index) => (
                    <span
                    key={index}
                    className="bg-indigo-500 m-2 text-gray-900 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}

                  </div>
                  <div >


                  <button 
                  className="bg-green-500 p-2 m-2  text-gray-900 px-3 py-1 rounded-md text-sm font-medium"
                  onClick={()=>{
                    navigate(`/edit/${post._id}`)
                  }}>
                    Edit
                  </button>
                  <button 
                  className="bg-red-500 p-2 text-gray-900 px-3 py-1 rounded-md text-sm font-medium"
                  onClick={()=>handleDelete(post._id)}>
                    Delete
                  </button>
                    </div>
                </div>
            
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;
