'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import NavItem from './nav-item'
import { routes } from "@/routes"

type Props = {}

interface NavigationItem {
    name: string;
    href: string;
    sub?: Omit<NavigationItem, 'sub'>[];
}

const Navigation = ({ }: Props) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigation: NavigationItem[] = [
        { name: 'Home', href: routes.home },
        { name: 'About', href: routes.about },
        // {
        //     name: 'Services',
        //     href: '#',
        //     sub: [
        //         { name: 'Tour Packages', href: '/services/tour-packages' },
        //         { name: 'Personalized Experience', href: '/services/personalized-experience' },
        //         { name: 'Accommodation', href: '/services/accommodation' },
        //         { name: 'Car Rental', href: '/services/car-rental' },
        //         { name: 'Guided Cultural Tours', href: '/services/guided-cultural-tours' },
        //     ]
        // },
        { name: 'Tour Packages', href: routes.packages },
        // { name: 'Upcoming Packages', href: '/packages' },
    ]

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <nav
                className={`fixed w-full z-50 transition-all duration-300 text-white ${isScrolled
                    ? 'glass shadow-md py-3'
                    : 'bg-transparent py-5'
                    }`}
            >
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="flex w-16 h-8 relative items-center">
                        <Image src={'/img/logo.png'} alt='' fill />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="hidden lg:flex lg:gap-x-12">
                            {navigation.map(({ href, name, sub }) =>

                                sub ? (
                                    <div key={name} className="relative group">
                                        <span className="hover:text-primary transition-colors cursor-pointer flex items-center text-sm/6 font-semibold">
                                            Services
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                        <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                            {sub.map(({ href, name }) =>
                                                <NavItem key={href} {...{ href, name }} className='block px-4 py-2 text-dark hover:bg-gray-100 hover:text-primary/80 rounded-lg' isSub />
                                            )}
                                        </div>
                                    </div>
                                ) : <NavItem key={name} {...{ href, name }} />

                            )}

                            {/* {navigation.map(({ name, href, sub }) => <div key={name}></div>)} */}
                        </div>
                    </div>

                    <Link href="/contact" className="hidden md:block">
                        <Button variant={'primary'} className="text-sm/6 font-semibold text-white">
                            Get In Touch
                        </Button>
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white text-dark absolute top-full left-0 w-full shadow-md">
                        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">

                            {navigation.map(({ name, href, sub }) =>
                                sub ?
                                    <div key={name} className="py-2">
                                        <span className="font-medium">Services</span>
                                        <div className="pl-4 mt-2 flex flex-col space-y-2">
                                            {sub.map(({ href, name }) =>
                                                <Link key={name} {...{ href }} className="hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>{name}</Link>
                                            )}
                                        </div>
                                    </div> : <Link key={name} {...{ href }} className="py-2 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>{name}</Link>
                            )}

                            <Link href="/contact" className="py-2" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant={'primary'} className="text-sm/6 font-semibold text-white">
                                    Get In Touch
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}

export default Navigation