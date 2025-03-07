import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Map, Tag, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white border-t border-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Map className="h-6 w-6 text-blue-200" />
              <h3 className="text-lg font-semibold text-white">AI Location Finder from Picture</h3>
            </div>
            <p className="text-blue-100">
              Your AI-powered companion for identifying locations from images. 
              Upload any travel photo and instantly identify landmarks, cities, and destinations around the world with detailed information and travel tips.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Map className="h-4 w-4 text-blue-300" />
                <Link to="/" className="text-blue-100 hover:text-white">
                  Location Finder
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-blue-300" />
                <Link to="/about" className="text-blue-100 hover:text-white">
                  About Our Service
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Search className="h-4 w-4 text-blue-300" />
                <Link to="/contact" className="text-blue-100 hover:text-white">
                  Get Help
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support Our Project</h3>
            <p className="text-blue-100 mb-4">
              Help us maintain and improve our free AI location finder from picture tool for travelers and photography enthusiasts everywhere.
            </p>
            <a
              href="https://roihacks.gumroad.com/l/dselxe?utm_campaign=donation-home-page&utm_medium=website&utm_source=ai-location-finder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 transition-colors"
            >
              Buy us a coffee
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-500">
          <div className="text-center text-blue-200">
            <p className="mb-2">&copy; {new Date().getFullYear()} AI Location Finder from Picture. Helping travelers identify places in a world of endless destinations.</p>
            <p className="text-sm">
              For informational purposes only. Use location identification results as a guide, not guaranteed matches.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}