import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "How do I create an account?",
    answer:
      "You can create an account by clicking the Get Started button on the homepage. Choose your role (User or Agent), provide your details, and verify your email or phone number.",
  },
  {
    question: "How can I deposit money into my wallet?",
    answer:
      "Users can deposit money via authorized agents. Navigate to your dashboard, select 'Deposit', choose an agent, and follow the instructions to transfer funds.",
  },
  {
    question: "How do I withdraw money from my wallet?",
    answer:
      "Withdrawals can be done via the agent network. Go to your dashboard, select 'Withdraw', choose an agent, and confirm the amount you want to withdraw.",
  },
  {
    question: "How do I send money to another user?",
    answer:
      "From your dashboard, select 'Send Money', enter the recipient's email or phone number, specify the amount, and confirm the transaction.",
  },
  {
    question: "Is my money secure in the digital wallet?",
    answer:
      "Yes! We use advanced encryption, multi-factor authentication, and other security measures to ensure your funds and data are safe.",
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find answers to common questions about our Digital Wallet service.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-gray-800 dark:text-gray-100">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  } text-gray-500 dark:text-gray-400`}
                />
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
