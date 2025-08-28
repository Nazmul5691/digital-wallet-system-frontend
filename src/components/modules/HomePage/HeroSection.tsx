import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function HeroBanner() {
  return (
    <div className="relative w-full banner-section h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] flex items-center justify-center text-center px-4 
                    bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute inset-0 h-full w-full opacity-10 dark:opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle className="text-blue-500 dark:text-white" cx="20" cy="20" r="1" fill="currentColor" />
          </pattern>
          <rect className="w-full h-full text-blue-500 dark:text-white" fill="url(#pattern-circles)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-2 sm:px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight 
                       text-white dark:text-gray-100 transition-colors duration-500">
          Your Money, Your Way.
          <br />
          Simple, Secure, Swift.
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto 
                      text-white/90 dark:text-gray-300 transition-colors duration-500">
          Manage your finances, send money to friends, and pay bills instantly with our all-in-one digital wallet.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-center sm:space-x-4 space-y-4 sm:space-y-0">
          <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200
                                     transition-transform transform hover:scale-105 px-6 sm:px-8 py-3 sm:py-6 rounded-full font-semibold text-base sm:text-lg shadow-lg w-full sm:w-auto">
            <Link to="/register">Get Started</Link>
          </Button>
          <Button asChild variant="outline" className="border-white bg-white/20 text-white hover:bg-white/30 dark:border-gray-300 dark:text-gray-200
                                                     dark:hover:bg-gray-700 transition-transform transform hover:scale-105 px-6 sm:px-8 py-3 sm:py-6 rounded-full font-semibold text-base sm:text-lg shadow-lg w-full sm:w-auto">
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
