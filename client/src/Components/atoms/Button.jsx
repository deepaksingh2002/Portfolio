import React from 'react';

const Button = ({
  children,
  type = 'button',
  className = '',
  as,
  variant,
  ...props
}) => {
  const base = 'px-4 py-2 rounded transition font-semibold';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 bg-white hover:bg-blue-50',
    default: 'bg-gray-200 text-gray-800',
  };
  const variantClass = variants[variant] || variants.default;
  const classes = `${base} ${variantClass} ${className}`;
  if (as === 'a') {
    return (
      <a className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};
export default Button;
