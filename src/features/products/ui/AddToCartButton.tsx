import React from 'react';

interface AddToCartButtonProps {
  handler: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ handler }) => {
  return (
    <button
      className='w-24 border text-sm py-1 rounded'
      onClick={() => handler()}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
