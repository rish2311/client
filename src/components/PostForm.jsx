import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
    <div className="bg-[#1F2937] border border-gray-600  p-4 rounded-lg">
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

const PostForm = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [tags, setTags] = useState([]); // Tags as an array
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/"); 
      toast.warn("User not authorized");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, content, tags };

    try {
      await API.post("/posts", newPost);
      toast.success("Form Created Successfully");
      clearForm()
    } catch (err) {
      toast.warn(err.response.data);
      console.error(err.response.data);
    }
  };

  const clearForm = () => {
    setTitle("");
    setContent("");
    setTags([]);
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
          Create Post
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
            placeholder="Type your content Here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows="6"
            required
          />
          <TagInput tags={tags} setTags={setTags} />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
