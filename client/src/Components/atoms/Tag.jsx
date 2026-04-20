import React from 'react';

const Tag = ({ children, className = '' }) => (
  <span className={`inline-block px-2 py-1 rounded bg-gray-200 text-gray-800 text-xs font-medium ${className}`}>
    {children}
  </span>
);

export default Tag;
