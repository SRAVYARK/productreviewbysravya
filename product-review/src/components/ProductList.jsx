import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReviewForm from './ReviewForm';
import { fetchProducts } from '../store/productSlice';
import { addReview } from '../store/reviewSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <ReviewForm productId={product.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;