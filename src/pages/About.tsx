import React from 'react';
import { Map } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Us</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 prose max-w-none">
          <p>
            Welcome to AI Location Finder from Picture, your trusted resource for AI-powered location identification.
            We're passionate about helping travelers, photography enthusiasts, and explorers identify
            specific places, landmarks, and destinations through advanced technology
            that analyzes visual characteristics of travel images from around the world.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to make location identification accessible to everyone by providing a free, easy-to-use
            AI location finder from picture tool. In an era of endless travel possibilities across countless destinations, we aim to help you
            quickly identify places you love, understand their historical and cultural significance, and receive personalized travel advice.
            Our free AI location finder from picture is designed to eliminate the frustration of identifying that perfect destination you spotted online
            or in person, helping more people discover and learn about amazing places worldwide.
          </p>

          <h2>Why Choose Our Tool?</h2>
          <ul>
            <li>Advanced AI recognition algorithms trained on diverse global landmarks and locations</li>
            <li>Detailed analysis reports with precise location identification</li>
            <li>Comprehensive information about architectural features, historical significance, and cultural context</li>
            <li>Practical travel tips including best times to visit and nearby attractions</li>
            <li>Geographic coordinates for easy navigation</li>
            <li>Insider advice from travel experts</li>
            <li>Completely free to use AI location finder from picture</li>
            <li>No registration required</li>
            <li>Privacy-focused approach</li>
            <li>User-friendly interface for travelers of all tech levels</li>
          </ul>

          <h2>Support Our Project</h2>
          <p>
            We're committed to keeping this AI location finder from picture tool free and accessible to everyone.
            If you find our tool useful, consider supporting us by buying us a coffee.
            Your support helps us maintain and improve the service, ensuring it remains available to all
            who want to identify locations and discover amazing places around the world.
          </p>

          <div className="mt-8 text-center">
            <a
              href="https://roihacks.gumroad.com/l/dselxe?utm_campaign=donation-home-page&utm_medium=website&utm_source=ai-location-finder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors text-lg font-semibold"
            >
              Support Our Work
            </a>
          </div>
          
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="flex items-center text-xl font-bold text-gray-900 mb-4">
              <Map className="h-5 w-5 text-blue-500 mr-2" />
              Important Disclaimer
            </h3>
            <p className="text-gray-700">
              While our free AI location finder from picture tool uses sophisticated algorithms to analyze places and landmarks, it's important to understand that no identification system is 100% accurate. The world is constantly changing, and similar architectural features may appear across multiple locations. 
            </p>
            <p className="text-gray-700 mt-2">
              Our free AI location finder from picture should be used as a helpful guide in your travel journey, not as a definitive source. We encourage verifying locations through multiple sources when making travel decisions. Information about visiting hours, entry fees, and local conditions may vary based on time of year and other factors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}