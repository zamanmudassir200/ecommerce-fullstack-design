import React, { useState } from "react";
import { Star } from "react-feather";
import { toast } from "react-toastify";

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return toast.warn("Please give a rating");
    onSubmit({ rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded shadow-md"
    >
      <h2 className="text-lg font-semibold text-gray-800">Write a Review</h2>

      {/* Star Rating */}
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 cursor-pointer transition ${
              (hoverRating || rating) >= star
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(star)}
            fill={(hoverRating || rating) >= star ? "#facc15" : "none"}
          />
        ))}
      </div>

      {/* Comment Box */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your thoughts here..."
        className="w-full h-24 border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
