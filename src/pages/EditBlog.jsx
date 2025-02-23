import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const categories = ["Tech", "Lifestyle", "Business", "Education", "Health"];
const tagSuggestions = ["React", "JavaScript", "WebDev", "Design", "Tutorial"];

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://blog-app-backend-nnuo.onrender.com/api/blogs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { title, content, category, tags } = response.data.blog;
        setTitle(title);
        setContent(content);
        setCategory(category);
        setTags(tags);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch blog post. Please try again.");
        console.error("Error fetching blog post:", error);
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://blog-app-backend-nnuo.onrender.com/api/blogs/${id}`,
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
      navigate(`/view/${id}`);
    } catch (error) {
      setError("Failed to update blog post. Please try again.");
      console.error("Error updating blog post:", error);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Edit Blog
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Tags Section */}
            <div>
              <input
                type="text"
                placeholder="Add a tag"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Suggestions:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {tagSuggestions.map((suggestion) => (
                    <span
                      key={suggestion}
                      onClick={() => setTagInput(suggestion)}
                      className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-gray-300"
                    >
                      #{suggestion}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            >
              Update Blog
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditBlog;
