import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const categories = ["Tech", "Lifestyle", "Business", "Education", "Health"];

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const navigate = useNavigate();

  const handleTagAdd = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagRemove = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://blog-app-backend-nnuo.onrender.com/api/blogs",
        {
          title,
          content,
          category,
          tags,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Create New Blog Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <div className="w-full p-3 border rounded-lg">
          <input
            type="text"
            placeholder="Enter tags and press Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagAdd}
            className="w-full focus:outline-none"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full cursor-pointer"
                onClick={() => handleTagRemove(index)}
              >
                #{tag} ✕
              </span>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
