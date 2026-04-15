'use client'

import { Clock, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react'
import { toast } from '@/hooks/use-toast';
import React, { useState } from 'react'
import { sanitizeFormData, isValidEmail, validateContent, RateLimiter } from '@/lib/security';

type Props = {}

const ContactPage = (props: Props) => {
    const [rateLimiter] = useState(() => new RateLimiter(2, 60000)); // 2 attempts per minute

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            subject: formData.get('subject') as string,
            message: formData.get('message') as string,
        };

        // Rate limiting check
        const clientId = `contact_${Date.now()}`;
        if (!rateLimiter.isAllowed(clientId)) {
            toast({
                title: "Too Many Attempts",
                description: "Please wait a moment before submitting again.",
                variant: "destructive"
            });
            return;
        }

        // Validate inputs
        if (!isValidEmail(data.email)) {
            toast({
                title: "Invalid Email",
                description: "Please enter a valid email address.",
                variant: "destructive"
            });
            return;
        }

        if (!validateContent(data.message, 2000)) {
            toast({
                title: "Invalid Message",
                description: "Message contains invalid content or is too long.",
                variant: "destructive"
            });
            return;
        }

        // Sanitize form data
        const sanitizedData = sanitizeFormData(data);
        console.log('Contact form data:', sanitizedData);

        toast({
            title: "Message Sent",
            description: "We'll get back to you as soon as possible!",
        });
    };

    return (
        <div className="min-h-screen pb-12">
            <div
                className="relative h-80 bg-cover bg-center"
                style={{ backgroundImage: "url('/img/about-banner.png')" }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-cursive font-bold capitalize">Contact us</h1>
                        <h2 className="mt-8 text-3xl">We'd Love to Hear from You</h2>
                    </div>
                </div>
            </div>

            <div className="container mx-auto pt-12 px-4">
                <div className="text-center mb-8">
                    <p className="max-w-2xl mx-auto text-gray-600">
                        Have questions about our services, need assistance planning your next adventure, or wish to provide feedback? Reach out to us. we're here to help!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white shadow-md rounded-lg p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                            <MapPin className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Our Location</h3>
                        <p className="text-gray-600">123 Travel Street, New York, NY 10001, United States</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                            <Phone className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Phone Number</h3>
                        <p className="text-gray-600">+233 24 459 2767</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                            <Mail className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Email Address</h3>
                        <p className="text-gray-600">info@savannahtrail.com</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="input-field"
                                            placeholder="John Smith"
                                            maxLength={100}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="input-field"
                                            placeholder="john@example.com"
                                            maxLength={254}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        className="input-field"
                                        placeholder="How can we help you?"
                                        maxLength={200}
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        className="input-field"
                                        placeholder="Write your message here..."
                                        maxLength={2000}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn-primary flex items-center justify-center w-full md:w-auto">
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

                            <div className="space-y-6">
                                {/* <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <MessageSquare className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Chat With Us</h4>
                                        <p className="text-gray-600 text-sm">Our friendly team is here to help.</p>
                                        <p className="text-primary font-medium mt-1">Start a chat</p>
                                    </div>
                                </div> */}

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <Clock className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Office Hours</h4>
                                        <p className="text-gray-600 text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                        <p className="text-gray-600 text-sm">Saturday: 10:00 AM - 4:00 PM</p>
                                        <p className="text-gray-600 text-sm">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h4 className="font-medium mb-3">Follow Us</h4>
                                <div className="flex space-x-3">
                                    <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg overflow-hidden h-96 mb-16">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127066.75982423426!2d-0.2621316353683902!3d5.591202954243995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra!5e0!3m2!1sen!2sgh!4v1776252623136!5m2!1sen!2sgh"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title="Office Location Map"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

export default ContactPage