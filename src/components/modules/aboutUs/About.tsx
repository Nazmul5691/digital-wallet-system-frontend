import { FaUserCircle } from 'react-icons/fa';
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  {
    name: "A. Rahman",
    role: "Co-Founder & CEO",
    image: null,
    bio: "Rahman is a visionary leader with over a decade of experience in FinTech. His passion for making financial services accessible drives our mission.",
  },
  {
    name: "F. Ahmed",
    role: "Chief Technology Officer",
    image: null,
    bio: "Fatima is the technical mastermind behind our platform. She ensures our system is secure, scalable, and always ahead of the curve.",
  },
  {
    name: "S. Khan",
    role: "Head of Product",
    image: null,
    bio: "Sami's expertise in user experience and product design has been instrumental in creating a seamless and intuitive app for our users.",
  },
];

export default function About() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-500">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 font-sans">
        {/* Header */}
        <div className="text-center mb-16 px-4 sm:px-0">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">About Us</h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            Our journey to revolutionize digital finance.
          </p>
        </div>

        {/* Our Story Section */}
        <section className="mb-16 sm:mb-20 px-2 sm:px-0">
          <Card className="bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-12 shadow-xl rounded-2xl border-none transition-colors duration-500">
            <CardContent className="p-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">Our Story</h2>
              <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Founded in 2025, our digital wallet was born from a simple idea: to create a financial tool that is fast, secure, and accessible to everyone. We noticed the growing need for a mobile-first solution that could handle everyday transactions—from sending money to family to paying for groceries—without the friction of traditional banking.
              </p>
              <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                We started as a small team with a big vision, tirelessly working to build a platform that prioritizes user experience and robust security. Today, we are proud to serve thousands of users, empowering them to manage their finances with confidence and ease.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Our Mission Section */}
        <section className="mb-16 sm:mb-20 px-2 sm:px-0">
          <Card className="bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-12 shadow-xl rounded-2xl border-none transition-colors duration-500">
            <CardContent className="p-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">Our Mission</h2>
              <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Our mission is to empower individuals and businesses by providing a seamless and secure digital wallet experience. We are committed to financial inclusion, building tools that break down barriers and connect communities. We believe that everyone deserves easy access to financial services, and we work every day to make that a reality.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Our Team Section */}
        <section>
          <div className="text-center mb-12 px-2 sm:px-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Meet the Team</h2>
            <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 mt-2">The passionate people behind our success.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-none transform transition-transform hover:scale-105 duration-300"
              >
                <CardContent className="p-6 sm:p-8 md:p-8 text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 flex items-center justify-center">
                    <FaUserCircle className="w-full h-full text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">{member.name}</h3>
                  <p className="text-xs sm:text-sm text-blue-600 dark:text-teal-400 font-medium mb-4">{member.role}</p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
