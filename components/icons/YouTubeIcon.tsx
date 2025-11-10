
import React from 'react';

interface IconProps {
  className?: string;
}

export const YouTubeIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    strokeWidth="2" 
    stroke="currentColor" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <rect x="3" y="5" width="18" height="14" rx="4"></rect>
    <path d="M10 9l5 3l-5 3z"></path>
  </svg>
);
