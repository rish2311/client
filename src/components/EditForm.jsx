import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === " " && inputValue.trim() !== "") {
      e.preventDefault();
      const newTag = `#${inputValue.trim()}`;
      setTags([...tags, newTag]);
      setInputValue("");
    }
    if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      e.preventDefault();
      const updatedTags = [...tags];
      updatedTags.pop();
      setTags(updatedTags);
    }
  };

  return (
    <div className="bg-[#1F2937] border border-gray-600 p-4 rounded-lg">
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-indigo-500 text-gray-900 px-3 py-1 rounded-full text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a hashtag and press space..."
        className="w-full px-3 py-2 border border-gray-700 bg-[#1F2937] text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
};

const EditPostForm = () => {
  const [title, setTitle] = useState(""); // Initialize with empty string
  const [content, setContent] = useState(""); // Initialize with empty string
  const [updateTags, setUpdateTags] = useState([]); // Tags as an array
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await API.get(`/posts/post/${id}`);
      const data = response.data;

      if (data) {
        console.log(data)
        setTitle(data.title || "");
        setContent(data.content || "");
        setUpdateTags(data.tags || []);
      } else {
        toast.error("Post not found!");
      }
    } catch (err) {
      console.error("Error fetching post data:", err);
      toast.error("Failed to fetch post data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
      toast.warn("User not authorized");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = { title, content, tags: updateTags };

    try {
      const respo = await API.put(`posts/post/${id}`, updatedPost);
      console.log(respo)
      toast.success("Post updated successfully!");
      navigate("/"); // Navigate to a different page after success
    } catch (err) {
      console.error("Error updating post:", err);
      toast.error("Failed to update the post.");
    }
  };

  const clearForm = () => {
    setTitle("");
    setContent("");
    setUpdateTags([]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full bg-gray-800 rounded-lg shadow-xl p-8"
        style={{
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <h2 className="text-center text-2xl font-bold text-white mb-6">
          Update Post
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <textarea
            placeholder="Type your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows="6"
            required
          />
          <TagInput tags={updateTags} setTags={setUpdateTags} />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;
