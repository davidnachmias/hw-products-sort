// src/components/Products.js

import React from 'react';

export default function Products({ products }) {
  return (
    <div className='product-container'>
      {products.map(product => (
        <div key={product.id} className='product-card'>
          <h3>Name: {product.title}</h3>
          <h3>Brand: {product.brand}</h3>
          <h3>Price: ${product.price}</h3>
        </div>
      ))}
    </div>
  );
}
