import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'a';
  variant?: 'primary' | 'outline' | 'default';
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export declare const Button: React.FC<ButtonProps>;
