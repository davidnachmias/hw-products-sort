// src/pages/HomePage.js

import React, { useState, useEffect, useRef } from 'react';
import Products from '../components/Products';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('all'); 
  const selectRef = useRef(null);

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = () => {
    if (sort === 'all') {
      return products; 
    }

    return [...products].sort((a, b) => {
      if (sort === 'name') {
        return a.title.localeCompare(b.title); // סידור לפי שם
      } else if (sort === 'price') {
        return a.price - b.price; 
      } else if (sort === 'brand') {
        const brandA = a.brand || ''; 
        const brandB = b.brand || '';
        return brandA.localeCompare(brandB); 
      }
      return 0;
    });
  };

  return (
    <div className='animated-background'>
      <div>
        <h1 style={{textAlign:"center"}}>HomePage</h1>
      </div>
      <div style={{marginTop:"20px", textAlign: 'center'}}>
        <label>
          Sort by:
          <select 
            ref={selectRef} // הוסף את ה- ref כאן
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="all">All</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="brand">Brand</option>
          </select>
        </label>
      </div>
      <div style={{marginTop:"60px"}}>
        <Products products={sortedProducts()} />
      </div>
    </div>
  );
}
