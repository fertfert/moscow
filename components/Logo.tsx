import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => (
  <h1 className={`${className} text-5xl md:text-6xl font-bold text-slate-800 tracking-tight`}>
    Moscow Life<sup className="text-2xl md:text-3xl font-bold top-[-1.2em] ml-1">®</sup>
  </h1>
);
