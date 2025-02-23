import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CommentSection from "../components/CommentSection";

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  // Fetching the blog post
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://blog-app-backend-nnuo.onrender.com/api/blogs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBlog(response.data.blog);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };
    fetchBlog();
  }, [id]);

  // Handling the deletion of the blog post
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await axios.delete(
          `https://blog-app-backend-nnuo.onrender.com/api/blogs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        navigate("/");
      } catch (error) {
        console.error("Error deleting blog post:", error);
      }
    }
  };

  if (!blog) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-5xl font-bold text-gray-800">{blog.title}</h1>
      <p className="text-gray-500 mt-2">Category: {blog.category}</p>
      <div className="border-t my-4"></div>
      <p className="text-gray-700 text-lg leading-relaxed">{blog.content}</p>
      <div className="mt-4">
        <strong>Tags: </strong>
        {blog.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-200 text-sm px-3 py-1 rounded-full mr-2"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => navigate(`/edit/${id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition duration-300"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md shadow-md transition duration-300"
        >
          Delete
        </button>
      </div>

      {/* Comment Section */}
      <div className="mt-10">
        <CommentSection blogId={id} />
      </div>
    </div>
  );
};

export default ViewBlog;
