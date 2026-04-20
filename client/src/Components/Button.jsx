import React from 'react';

export const Button = ({ children, type = 'button', className = '', ...props }) => (
	<button
		type={type}
		className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition ${className}`}
		{...props}
	>
		{children}
	</button>
);
