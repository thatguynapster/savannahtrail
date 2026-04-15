'use client'

import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import React, { useState } from 'react'
import Image from "next/image";
import Link from 'next/link'

import { PLACEHOLDER_IMAGE } from '@/lib/utils'
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = {}

const Footer = (props: Props) => {

    const [logoError, setLogoError] = useState(false);

    return (
        <footer className="bg-white pt-16 pb-8 border-t">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="space-y-6">
                        <Link href="/" className="flex w-16 h-8 relative items-center">
                            <Image
                                src={logoError ? PLACEHOLDER_IMAGE : '/img/logo-full.png'}
                                alt='Logo'
                                fill
                                priority
                                onError={() => setLogoError(true)}
                                sizes="64px"
                            />
                        </Link>

                        <p className="text-gray-600 text-sm">
                            Follow us for African travel inspiration.
                        </p>

                        <div className="flex space-x-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-6">Company</h4>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-gray-600 hover:text-primary transition-colors">About Us</Link></li>
                            {/* <li><Link href="/careers" className="text-gray-600 hover:text-primary transition-colors">Careers</Link></li> */}
                            {/* <li><Link href="/blog" className="text-gray-600 hover:text-primary transition-colors">Blog</Link></li> */}
                            <li><Link href="/faqs" className="text-gray-600 hover:text-primary transition-colors">FAQs</Link></li>
                            <li><Link href="/privacy-policy" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* <div>
                        <h4 className="text-lg font-semibold mb-6">Destinations</h4>
                        <ul className="space-y-3">
                            <li><Link href="/destinations/cape-coast" className="text-gray-600 hover:text-primary transition-colors">Cape Coast & Elmina</Link></li>
                            <li><Link href="/destinations/ouidah" className="text-gray-600 hover:text-primary transition-colors">Ouidah</Link></li>
                            <li><Link href="/destinations/johannesburg" className="text-gray-600 hover:text-primary transition-colors">Johannesburg & Soweto</Link></li>
                            <li><Link href="/destinations/marrakesh" className="text-gray-600 hover:text-primary transition-colors">Marrakesh</Link></li>
                        </ul>
                    </div> */}

                    <div>
                        <h4 className="text-lg font-semibold mb-6">Join Our Newsletter</h4>
                        <p className="text-gray-600 mb-4 text-sm">
                            Get updates on new tour packages, cultural events, and travel tips to inspire your next adventure
                        </p>
                        <div className="flex w-full flex-col md:flex-row">
                            {/* <input
                                type="email"
                                placeholder="Your email address"
                                className="px-4 py-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
                            /> */}
                            <Input
                                type="email"
                                placeholder="Your email address"
                                className='px-4 py-3 md:!rounded-r-none border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary'
                            />
                            <Button variant={'primary'} className='mt-2 md:mt-0 md:!rounded-l-none'> Subscribe </Button>
                            {/* <button className="bg-primary text-white px-4 py-3 rounded-r-md hover:bg-primary-hover transition-colors">
                                Subscribe
                            </button> */}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-16 pt-8 text-center">
                    <p className="text-gray-600 text-sm">
                        Copyright © {new Date().getFullYear()}. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer