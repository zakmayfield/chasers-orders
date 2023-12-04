import React from 'react';

interface AddToCartButtonProps {
  handler: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ handler }) => {
  return <button onClick={() => handler()}>Add to Cart</button>;
};

export default AddToCartButton;
