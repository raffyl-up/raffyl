import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  hover = false
}) => {
  const baseClasses = 'bg-white rounded-xl border border-gray-200';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-12'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-lg',
    lg: 'shadow-xl'
  };

  const hoverClass = hover ? 'hover:shadow-xl transition-shadow duration-200' : '';

  const classes = `${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${hoverClass} ${className}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;
