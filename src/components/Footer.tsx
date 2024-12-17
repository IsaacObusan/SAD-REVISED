import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t-2 border-gray-200">
      <div className="max-w-screen-xl px-6 py-8 mx-auto">
        {/* Top Section: Partnership */}
        <div className="mb-8 text-center">
          <p className="text-sm text-gray-700">In partnership with:</p>
          <div className="flex items-center justify-center mt-2 gap-7">
            <img src="/Pwd.png" alt="PWD" className="h-16 sm:h-12" />
          
          </div>
        </div>
        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-6 text-sm text-gray-600 sm:grid-cols-4">
          <div>
            <h3 className="mb-2 font-bold text-gray-800">Job Seekers</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Job Search</a></li>
              <li><a href="#" className="hover:underline">Profile</a></li>
              <li><a href="#" className="hover:underline">Recommended Jobs</a></li>
              <li><a href="#" className="hover:underline">Career Advice</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-bold text-gray-800">Employers</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Post a Job</a></li>
              <li><a href="#" className="hover:underline">Products & Prices</a></li>
              <li><a href="#" className="hover:underline">Market Insights</a></li>
              <li><a href="#" className="hover:underline">Hiring Advice</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-bold text-gray-800">About Us</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Newsroom</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Partner Services</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-bold text-gray-800">Contact</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">Social</a></li>
            </ul>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="mt-6 text-xs text-center text-gray-500">
          <p>© 2024 Job Compass. All Rights Reserved.</p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <a href="#" className="hover:underline">Terms & Conditions</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
