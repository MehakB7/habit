import React from 'react';
import { Logo } from '@/components/icons/logo';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="p-4 text-white flex items-center justify-between border-b border-gray-800">
      <Link href="/">
          <Logo />
      </Link>
    </header>
  );
};

export default Header;