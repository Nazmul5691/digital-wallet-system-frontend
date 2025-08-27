import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!name || !email || !subject || !message) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true);

        // Simulate submission delay
        setTimeout(() => {
            setLoading(false);
            toast.success("Message sent successfully!");
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
                        Contact Us
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Have a question or need support? Send us a message and we'll get back to you shortly.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg space-y-6"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Name
                        </label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                        </label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your Email"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Subject
                        </label>
                        <Input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Subject"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Message
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write your message..."
                            className="w-full"
                            rows={5}
                        />
                    </div>

                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "Sending..." : "Send Message"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
