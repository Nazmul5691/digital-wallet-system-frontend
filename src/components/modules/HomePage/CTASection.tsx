import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function CTASection() {
  return (
    <div className="py-20 bg-gray-800 dark:bg-gray-50 text-white dark:text-gray-900 text-center transition-colors duration-500">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4 text-white dark:text-gray-900 transition-colors duration-500">
          Ready to simplify your financial life?
        </h2>
        <p className="text-lg text-gray-300 dark:text-gray-700 mb-8 max-w-3xl mx-auto transition-colors duration-500">
          Join thousands of satisfied users who trust our platform for fast, secure, and convenient money management.
        </p>
        <Button
          asChild
          className="bg-white dark:bg-blue-600 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-blue-700 transition-transform transform hover:scale-105 px-10 py-6 rounded-full font-semibold text-lg shadow-lg"
        >
          <Link to="/register">Create Your Free Account</Link>
        </Button>
      </div>
    </div>
  );
}
