import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t-2 border-gray-200">
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        {/* Top Section: Partnership */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-700">In partnership with:</p>
          <div className="flex justify-center items-center gap-7 mt-2">
            <img src="/Pwd.png" alt="PWD" className="h-10 sm:h-12" />
            <img src="/Labor.png" alt="Labor" className="h-10 sm:h-12" />
          </div>
        </div>
        {/* Footer Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm text-gray-600">
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Job Seekers</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Job Search</a></li>
              <li><a href="#" className="hover:underline">Profile</a></li>
              <li><a href="#" className="hover:underline">Recommended Jobs</a></li>
              <li><a href="#" className="hover:underline">Career Advice</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Employers</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Post a Job</a></li>
              <li><a href="#" className="hover:underline">Products & Prices</a></li>
              <li><a href="#" className="hover:underline">Market Insights</a></li>
              <li><a href="#" className="hover:underline">Hiring Advice</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-2">About Us</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Newsroom</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Partner Services</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Contact</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">Social</a></li>
            </ul>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>© 2024 Job Compass. All Rights Reserved.</p>
          <div className="flex justify-center items-center gap-4 mt-2">
            <a href="#" className="hover:underline">Terms & Conditions</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
