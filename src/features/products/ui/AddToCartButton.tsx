'use client';

import React from 'react';

interface AddToCartButtonProps {
  addToCart: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ addToCart }) => {
  // TODO: Add disable on loading / already added to cart logic
  return (
    <button
      className='w-24 border text-sm py-1 rounded'
      onClick={() => addToCart()}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
