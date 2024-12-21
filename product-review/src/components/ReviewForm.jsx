import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from '../store/reviewSlice';
import axios from 'axios';
import "./ReviewForm.css"

const ReviewForm = ({ productId }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add review through Redux
    dispatch(addReview({ productId, review, rating }));

    // Send review to json-server
    await axios.post('http://localhost:3000/reviews', {
      productId,
      review,
      rating,
    });

    setReview('');
    setRating(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review"
        required
      />
      <br />
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;