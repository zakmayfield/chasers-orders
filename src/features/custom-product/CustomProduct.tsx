'use client';
import { FC, FormEvent, useEffect, useState } from 'react';

interface CustomProductProps {}

export const CustomProduct: FC<CustomProductProps> = ({}) => {
  const [ingredients, setIngredients] = useState<string[]>([]);

  const [input, setInput] = useState<string>('');

  function handleAddIngredient(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIngredients([...ingredients, input]);
    setInput('');
  }

  useEffect(() => {
    console.log(`useEffect:input`, { input });
  });

  return (
    <div className='border rounded p-6'>
      <div>Custom product</div>
      <form onSubmit={(e) => handleAddIngredient(e)}>
        <input
          className='border rounded-md'
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button>add</button>
      </form>

      <div className='flex gap-3'>
        {ingredients.map((x) => (
          <span key={x}>{x}</span>
        ))}
      </div>

      <div>
        <button>submit</button>
      </div>
    </div>
  );
};
