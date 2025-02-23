import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const categories = [
  "All",
  "Tech",
  "Lifestyle",
  "Business",
  "Education",
  "Health",
];

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://blog-app-backend-nnuo.onrender.com/api/blogs",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedTag(""); // Reset tag filter when category changes
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setSelectedCategory("All"); // Reset category filter when a tag is clicked
  };

  const filteredBlogs = blogs.filter((blog) => {
    const categoryMatch =
      selectedCategory === "All" || blog.category === selectedCategory;
    const tagMatch =
      selectedTag === "" ||
      blog.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase());
    return (
      categoryMatch &&
      tagMatch &&
      (blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.category.toLowerCase().includes(search.toLowerCase()) ||
        blog.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        ))
    );
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white py-24 mb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-50 bg-gradient-to-br from-indigo-700 to-purple-800 blur-lg"></div>
        <div className="relative max-w-7xl mx-auto text-center px-4">
          <h1 className="text-5xl font-extrabold mb-4 animate-pulse">
            Discover Amazing Blogs
          </h1>
          <p className="text-xl mb-8">
            Dive into the latest articles and trends.
          </p>
          <div className="relative mx-auto w-full md:w-2/3 lg:w-1/2">
            <input
              type="text"
              placeholder="Search by title, category, or tags"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 rounded-full p-4 w-full text-gray-800 shadow-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
            {isAuthenticated && (
              <button
                onClick={() => navigate("/create")}
                className="mt-6 bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              >
                + Create Blog
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 mb-6 flex flex-col md:flex-row justify-between items-center">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {selectedTag && (
          <div className="mt-4 md:mt-0 bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
            Filtered by Tag: #{selectedTag}
          </div>
        )}
      </div>

      {/* Blog Cards Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white shadow-lg hover:shadow-2xl rounded-3xl overflow-hidden transition-shadow duration-300 transform hover:-translate-y-2"
              >
                <Link to={`/view/${blog._id}`}>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition duration-300">
                      {blog.title}
                    </h2>
                    <p className="text-gray-500 mt-2">
                      Category:{" "}
                      <span className="font-semibold">{blog.category}</span>
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-indigo-200"
                          onClick={() => handleTagClick(tag)}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-xl">
              No blogs found. Try adjusting your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
