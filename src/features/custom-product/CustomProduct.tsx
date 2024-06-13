'use client';
import { FC, FormEvent, useEffect, useState } from 'react';
import { categoryData } from '../products/helpers.products';

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
      <form onSubmit={(e) => handleAddIngredient(e)} className='flex flex-col'>
        <div>
          <label htmlFor='category'></label>
          <select name='category'>
            <option>type</option>
            {categoryData.slice(0, 4).map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <input
            className='border rounded-md'
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button>add ingredient</button>
        </div>
      </form>

      <div className='flex gap-3'>
        {ingredients.map((x) => (
          <span key={x}>{x}</span>
        ))}
      </div>

      <div>
        <button>add to cart</button>
      </div>
    </div>
  );
};
