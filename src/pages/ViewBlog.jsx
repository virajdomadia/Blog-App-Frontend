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
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">{blog.title}</h1>
      <p className="text-gray-500">Category: {blog.category}</p>
      <p className="text-gray-600 mt-4">{blog.content}</p>
      <div className="mt-4">
        <strong>Tags: </strong>
        {blog.tags.map((tag, index) => (
          <span key={index} className="bg-gray-200 px-2 py-1 rounded mr-2">
            {tag}
          </span>
        ))}
      </div>
      <button
        onClick={() => navigate(`/edit/${id}`)}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mr-2"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded mt-4"
      >
        Delete
      </button>

      {/* Comment Section */}
      <div className="mt-8">
        <CommentSection blogId={id} />
      </div>
    </div>
  );
};

export default ViewBlog;
