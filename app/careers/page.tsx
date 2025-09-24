'use client';

import { useEffect, useState } from "react";

export default function Careers() {
   const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div className="min-h-screen py-20">
        {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Staff <span className="text-orange-500">Recruitment</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From Ambition to Achievement. Professional Support. Strategic Planning. Career Growth
            </p>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-lg lg:text-2xl font-bold text-gray-900 mb-6">
            Join Our <span className="text-orange-500">Team</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Be part of a team that is transforming workplace cultures around the world. 
            We are always looking for passionate HR professionals to join our mission.
          </p>
          <div className="mt-12">
            <p className="text-lg text-gray-600">
              Career opportunities coming soon. Check back for exciting openings!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}