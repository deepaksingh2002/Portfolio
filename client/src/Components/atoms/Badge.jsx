import React from 'react';

const Badge = ({ children, color = 'blue', variant, className = '' }) => {
  // Support both color and variant for compatibility
  const colorMap = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    gray: 'bg-gray-100 text-gray-800',
    accent: 'bg-purple-100 text-purple-800',
  };
  const badgeClass = variant && colorMap[variant] ? colorMap[variant] : colorMap[color] || colorMap.blue;
  return (
    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${badgeClass} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
