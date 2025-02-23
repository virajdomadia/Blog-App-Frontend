import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://blog-app-backend-nnuo.onrender.com/api/blogs/${blogId}/comments`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setComments(response.data.comments);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };

    fetchComments();
  }, [blogId]);

  // Handle adding a new comment
  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `https://blog-app-backend-nnuo.onrender.com/api/blogs/${blogId}/comments`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNewComment("");
      setError("");

      // Refresh comments after adding a new one
      const response = await axios.get(
        `https://blog-app-backend-nnuo.onrender.com/api/blogs/${blogId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setComments(response.data.comments);
    } catch (err) {
      console.error("Failed to add comment", err);
      setError("Failed to add comment. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Comments</h3>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="mb-4 p-4 bg-white rounded-lg shadow-sm border"
          >
            <p className="text-gray-800">{comment.content}</p>
            <small className="text-gray-500">- {comment.user.username}</small>
          </div>
        ))
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}

      <form onSubmit={handleAddComment} className="mt-4">
        <textarea
          className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default CommentSection;
