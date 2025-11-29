'use client'

import { ArrowDown01, ArrowDownAZ, ArrowUp10, ArrowUpZA, Calendar, CalendarIcon, Clock, Compass, MapPin, Tag, Users } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

const PackagesPage = (props: Props) => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

    return (
        <div className="min-h-screen pb-12">
            <div
                className="relative h-80 bg-cover bg-center"
                style={{ backgroundImage: "url('/img/about-banner.png')" }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-cursive font-bold">Tour Packages</h1>
                        <h2 className="mt-8 text-3xl capitalize">All-inclusive Cultural Tour Packages</h2>
                    </div>
                </div>
            </div>

            <div className="container mx-auto pt-12 px-4">
                <div className="text-center mb-8">
                    <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                        Discover Africa through curated, all-inclusive experiences that blend heritage, adventure, and community. Our packages include guided tours, accommodations, cultural activities, and optional flight support—crafted to immerse you in unforgettable journeys.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button className="flex items-center gap-2 bg-white px-5 py-3 rounded-md shadow-sm">
                        <CalendarIcon className="w-5 h-5" />
                        <span>Date</span>
                    </button>
                    <button
                        className="flex items-center gap-2 bg-white px-5 py-3 rounded-md shadow-sm"
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    >
                        {sortOrder === 'asc' ? (
                            <>
                                <ArrowUp10 className="w-5 h-5" />
                                <span>Price High To Low</span>
                            </>
                        ) : (
                            <>
                                <ArrowDown01 className="w-5 h-5" />
                                <span>Price Low To High</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Featured Packages */}
                <div className="mb-16">
                    <h3 className="text-2xl font-semibold mb-8">Our Featured Tour Packages</h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {[
                            {
                                name: "European Grand Tour",
                                duration: "14 days",
                                countries: ["France", "Italy", "Switzerland", "Germany"],
                                price: 2899,
                                image: "https://images.unsplash.com/photo-1491557345352-5929e343eb89"
                            },
                            {
                                name: "Southeast Asian Adventure",
                                duration: "12 days",
                                countries: ["Thailand", "Vietnam", "Cambodia"],
                                price: 1999,
                                image: "https://images.unsplash.com/photo-1528181304800-259b08848526"
                            },
                            {
                                name: "African Safari Experience",
                                duration: "10 days",
                                countries: ["Kenya", "Tanzania"],
                                price: 3499,
                                image: "https://images.unsplash.com/photo-1516426122078-c23e76319801"
                            },
                            {
                                name: "South American Explorer",
                                duration: "16 days",
                                countries: ["Peru", "Brazil", "Argentina"],
                                price: 3199,
                                image: "https://images.unsplash.com/photo-1526392060635-9d6019884377"
                            }
                        ].map((pkg, index) => (
                            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row card-hover">
                                <div className="md:w-2/5">
                                    <img
                                        src={`${pkg.image}?auto=format&q=75&fit=crop&w=600&h=400`}
                                        alt={pkg.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="md:w-3/5 p-6">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-xl font-semibold">{pkg.name}</h4>
                                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                            {pkg.duration}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {pkg.countries.map((country, i) => (
                                            <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                                                {country}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center text-gray-600">
                                            <Users className="w-4 h-4 mr-2" />
                                            <span className="text-sm">Group size: 10-15 people</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            <span className="text-sm">Multiple departure dates available</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Compass className="w-4 h-4 mr-2" />
                                            <span className="text-sm">Guided tours included</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-between items-center">
                                        <div>
                                            <span className="text-2xl font-bold text-primary">${pkg.price}</span>
                                            <span className="text-gray-500 text-sm"> / person</span>
                                        </div>
                                        <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Package Categories */}
                <div className="mb-16">
                    <h3 className="text-2xl font-semibold mb-8">Browse by Category</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                category: "Adventure Tours",
                                desc: "Thrilling experiences for the bold traveler",
                                image: "https://images.unsplash.com/photo-1527751171053-6ac5ec50000b"
                            },
                            {
                                category: "Luxury Getaways",
                                desc: "Premium experiences with top-tier accommodations",
                                image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"
                            },
                            {
                                category: "Family Packages",
                                desc: "Fun for all ages with family-friendly activities",
                                image: "https://images.unsplash.com/photo-1504150558240-0b4fd8946624"
                            },
                            {
                                category: "Honeymoon Specials",
                                desc: "Romantic escapes for newlyweds",
                                image: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22"
                            },
                            {
                                category: "Cultural Immersions",
                                desc: "Deep dive into local traditions and heritage",
                                image: "https://images.unsplash.com/photo-1490822180406-880c226c150b"
                            },
                            {
                                category: "Beach Holidays",
                                desc: "Relax on pristine shores worldwide",
                                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                            }
                        ].map((category, index) => (
                            <div key={index} className="relative rounded-lg overflow-hidden card-hover h-64">
                                <img
                                    src={`${category.image}?auto=format&q=75&fit=crop&w=600&h=400`}
                                    alt={category.category}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                                    <h4 className="text-white text-xl font-semibold">{category.category}</h4>
                                    <p className="text-white/80 mt-1">{category.desc}</p>
                                    <button className="mt-4 bg-white/30 hover:bg-white/40 backdrop-blur-sm text-white px-4 py-2 rounded-md transition-colors self-start">
                                        Explore
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="bg-gray-50 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold mb-6 text-center">Why Book Our Tour Packages</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="bg-primary/10 p-4 rounded-full mb-4">
                                <Tag className="w-8 h-8 text-primary" />
                            </div>
                            <h4 className="font-semibold mb-2">Best Value</h4>
                            <p className="text-gray-600">Save up to 30% compared to booking components separately.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="bg-primary/10 p-4 rounded-full mb-4">
                                <Clock className="w-8 h-8 text-primary" />
                            </div>
                            <h4 className="font-semibold mb-2">Time-Saving</h4>
                            <p className="text-gray-600">All planning is done for you - just pack and go!</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="bg-primary/10 p-4 rounded-full mb-4">
                                <MapPin className="w-8 h-8 text-primary" />
                            </div>
                            <h4 className="font-semibold mb-2">Local Expertise</h4>
                            <p className="text-gray-600">Our guides provide insider access and knowledge.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="bg-primary/10 p-4 rounded-full mb-4">
                                <Compass className="w-8 h-8 text-primary" />
                            </div>
                            <h4 className="font-semibold mb-2">Unique Experiences</h4>
                            <p className="text-gray-600">Access exclusive activities not available to individual travelers.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PackagesPage