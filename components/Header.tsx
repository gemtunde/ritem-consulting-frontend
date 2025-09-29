'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    {
      name: 'Services',
      submenu: [
        { name: 'Career Consultancy', href: '/services/career-consultancy' },
        { name: 'Corporate Training', href: '/services/corporate-trainings' },
        { name: 'Staff Recruitment', href: '/services/staff-recruitment' },
      ],
    },
    {
      name: 'Candidates',
      submenu: [
        // { name: 'Upload CV', href: '/candidates/upload-cv' },
        { name: 'Jobs', href: '/' },
        // { name: 'Jobs', href: '/jobs' },
      ],
    },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm top-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="w-20 h-20 relative transition-all duration-300">
              <Image
                src="/logos/logo.png"
                alt="logo"
                fill
                className="object-contain"
                sizes="(max-width: 64px) 100vw, 64px"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) =>
              item.submenu ? (
                <div key={item.name} className="relative group">
                  <button className="flex items-center text-gray-600 hover:text-orange-500 font-medium">
                    {item.name}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  {/* Dropdown */}
                  <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md py-2 w-56 z-50">

                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block px-4 py-2 text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) =>
                item.submenu ? (
                  <div key={item.name}>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.name ? null : item.name)
                      }
                      className="flex justify-between items-center w-full px-3 py-2 text-gray-600 hover:text-orange-500 font-medium"
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transform transition-transform ${
                          openDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openDropdown === item.name && (
                      <div className="ml-4 flex flex-col space-y-1">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-3 py-1 text-gray-600 hover:text-orange-500"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 hover:text-orange-500 font-medium px-3 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
