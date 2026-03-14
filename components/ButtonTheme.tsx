'use client';

import { useTheme } from 'next-themes';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';

export default function ButtonTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={handleTheme}
      className="w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary dark:text-text-secondary-dark hover:bg-subtle dark:hover:bg-subtle-dark transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <IoMoonOutline size={18} /> : <IoSunnyOutline size={18} />}
    </button>
  );
}
