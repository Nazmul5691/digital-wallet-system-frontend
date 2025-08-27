import { FaArrowCircleDown, FaArrowCircleUp, FaWallet, FaMoneyBillWave, FaExchangeAlt, FaLock } from 'react-icons/fa';

const walletFeatures = [
    {
        title: "Cash In",
        description: "Add money to your wallet easily via bank, card, or authorized agents. Instant and secure.",
        icon: <FaArrowCircleDown className="text-4xl text-green-500" />,
    },
    {
        title: "Cash Out",
        description: "Withdraw funds from your wallet to your bank or at agents nearby. Quick and hassle-free.",
        icon: <FaArrowCircleUp className="text-4xl text-red-500" />,
    },
    {
        title: "Deposit",
        description: "Deposit funds into your wallet for seamless payments and transfers. Safe and reliable.",
        icon: <FaWallet className="text-4xl text-purple-500" />,
    },
    {
        title: "Withdraw",
        description: "Easily withdraw your money whenever you need it. Fast service at your fingertips.",
        icon: <FaMoneyBillWave className="text-4xl text-yellow-500" />,
    },
    {
        title: "Send Money",
        description: "Send money to friends, family, or merchants in just a few taps. Convenient and instant.",
        icon: <FaExchangeAlt className="text-4xl text-blue-500" />,
    },
    {
        title: "Security",
        description: "Your funds and data are protected with advanced encryption and multi-factor authentication.",
        icon: <FaLock className="text-4xl text-indigo-500" />,
    },
];

export default function Features() {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-16 px-4 transition-colors duration-500">
            <div className="max-w-7xl mx-auto text-center">
                {/* Header */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
                    Wallet Features
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
                    Discover all the ways our digital wallet makes your financial life easier, secure, and fast.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    {walletFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-6 sm:p-8 md:p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                            <div className="p-4 mb-4 sm:mb-6 rounded-full bg-gray-100 dark:bg-gray-700">
                                {feature.icon}
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 sm:mb-3">
                                {feature.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
