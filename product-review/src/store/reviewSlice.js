import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {},
  reducers: {
    addReview: (state, action) => {
      const { productId, review, rating } = action.payload;
      if (!state[productId]) {
        state[productId] = [];
      }
      state[productId].push({ review, rating });
    },
  },
});

export const { addReview } = reviewSlice.actions;
export default reviewSlice.reducer;