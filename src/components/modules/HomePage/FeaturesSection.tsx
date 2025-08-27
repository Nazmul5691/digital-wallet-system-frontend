import { FaMoneyBillWave, FaExchangeAlt, FaHistory } from 'react-icons/fa';

const features = [
  {
    icon: <FaMoneyBillWave className="text-4xl text-blue-600 dark:text-blue-400" />,
    title: "Instant Payments",
    description: "Send and receive money instantly, anytime, anywhere. No delays, no hassle.",
  },
  {
    icon: <FaExchangeAlt className="text-4xl text-purple-600 dark:text-purple-400" />,
    title: "Seamless Transfers",
    description: "Easily transfer funds to other users and manage your transactions with a tap.",
  },
  {
    icon: <FaHistory className="text-4xl text-emerald-600 dark:text-emerald-400" />,
    title: "Detailed History",
    description: "Keep track of all your financial activities with a comprehensive and clear transaction history.",
  },
];

export default function FeaturesSection() {
  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-500">
          Why Choose Us?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 transition-colors duration-500">
          Experience the future of digital finance with our secure and user-friendly platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-500">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
