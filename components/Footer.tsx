import Link from 'next/link';
import {  Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '/' },
      { name: 'Staff Recruitment', href: '/careers' },
        { name: 'Corporate Training', href: '/resources' },
            { name: 'Career Consultancy', href: '/staff' },
        // { name: 'Culture', href: '/services#culture' },
        // { name: 'Leadership', href: '/services#leadership' }
      ]
    },
    {
      title: 'Contact Information',
      links: [
        { name: 'Tell us about your project, make an enquiry to get started.', href: '/' },
        { name: 'Email: info@ritemconsulting.com', href: '/' },
        // { name: 'Staff Recruitment', href: '/careers' },
      ]
    },
    // {
    //   title: 'Company',
    //   links: [
    //     { name: 'About Us', href: '/about' },
    //     { name: 'Our Team', href: '/about#team' },
    //     { name: 'Careers', href: '/staff' },
    //   ]
    // },
    // {
    //   title: 'Support',
    //   links: [
    //     { name: 'Contact Us', href: '/contact' },
    //     // { name: 'FAQ', href: '/faq' },
    //     { name: 'Privacy Policy', href: '/privacy' },
    //     { name: 'Terms of Service', href: '/terms' }
    //   ]
    // }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
              <div className="w-24 h-24 relative transition-all duration-300 ">
                    <Image
                      src="/logos/logo.png"
                      alt='logo ritem'
                      fill
                      className="object-contain"
                      sizes="(max-width: 192px) 100vw, 192px"
                    />
                  </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming workplace cultures through proven  employee <br /> engagement strategies. 
             <br /> Helping organizations create thriving environments <br /> where people love to work.
            </p>
             <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            {/* <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span>123 Business Ave, Suite 100<br />New York, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-orange-500" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-orange-500" />
                <span>hello@ritemconsulting.com</span>
              </div>
            </div> */}
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Business Hours */}
        {/* <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 2:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div> */}

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 RITEM Consulting. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-orange-500 text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-orange-500 text-sm transition-colors duration-200">
              Terms of Service
            </Link>
            {/* <Link href="/cookies" className="text-gray-400 hover:text-orange-500 text-sm transition-colors duration-200">
              Cookie Policy
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}