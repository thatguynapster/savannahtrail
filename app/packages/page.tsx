'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { packagesApi } from '@/lib/api/packages';
import { Package } from '@/types/package';
import { PackageCard } from '@/components/package-card';

const PackagesPage = () => {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await packagesApi.getPackages(currentPage, itemsPerPage, { status: ['active'] });

                // Handle both response formats (response and responses)
                const data = response.responses || response.response;

                if (data && 'docs' in data) {
                    setPackages(data.docs);
                    setTotalPages(data.pages);
                } else {
                    setError('Invalid response format');
                }
            } catch (err) {
                setError('Failed to load packages. Please try again later.');
                console.error('Error fetching packages:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, [currentPage]);

    // Client-side sorting
    const sortedPackages = [...packages].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.base_price - b.base_price;
        } else if (sortOrder === 'desc') {
            return b.base_price - a.base_price;
        }
        return 0;
    });

    return (
        <div className="min-h-screen pb-12">
            <div
                className="relative h-80 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&h=600&q=80')" }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-cursive font-bold">Plan Your Trip</h1>
                        <h2 className="mt-8 text-3xl capitalize">Experience Culture, History, and Adventure</h2>
                    </div>
                </div>
            </div>

            <section className="py-16">
                <div className="text-center mb-8">
                    <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                        Embark on an unforgettable journey through Africa's rich tapestry of cultures and histories. Our expert local guides are passionate storytellers, ready to immerse you in authentic experiences that connect you deeply with the land and its people.
                        Whether you're tracing ancestral roots, exploring vibrant festivals, or discovering hidden gems, we're here to make your adventure truly memorable.
                    </p>
                </div>

                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <button
                            className="flex items-center gap-2 bg-white px-5 py-3 rounded-md shadow-sm hover:bg-gray-50"
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? null : 'asc')}
                        >
                            <span>
                                {sortOrder === null && 'Sort by Price'}
                                {sortOrder === 'asc' && 'Price: Low to High ↑'}
                                {sortOrder === 'desc' && 'Price: High to Low ↓'}
                            </span>
                        </button>
                    </div>

                    {loading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Array(6).fill(0).map((_, i) => (
                                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
                                    <div className="w-full h-56 bg-gray-300"></div>
                                    <div className="p-6">
                                        <div className="h-6 bg-gray-300 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-300 rounded mb-4"></div>
                                        <div className="h-8 bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-12">
                            <p className="text-red-600 text-lg mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-md transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {!loading && !error && sortedPackages.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">No packages available at the moment.</p>
                        </div>
                    )}

                    {!loading && !error && sortedPackages.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {sortedPackages.map((pkg) => (
                                <PackageCard key={pkg._id} package={pkg} />
                            ))}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-12">
                            <div className="flex space-x-1">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
                                >
                                    &lt;
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-3 py-2 border rounded-md ${currentPage === page
                                            ? 'bg-primary text-white'
                                            : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-8 bg-white p-8 rounded-xl shadow-md">
                        <div className="md:w-1/2">
                            <h3 className="text-2xl font-semibold mb-4">Plan Your Trip</h3>
                            <p className="text-gray-600 mb-6">
                                Discover amazing destinations and create unforgettable memories with our carefully curated tour packages.
                            </p>

                            <div className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="input-field pl-10"
                                        placeholder="Search Tour"
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        className="input-field pl-10"
                                        placeholder="Where To?"
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="relative">
                                    <input
                                        type="date"
                                        className="input-field pl-10"
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h4 className="text-lg font-semibold mb-3">Filter By Price</h4>
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-1/2"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-sm text-gray-600">Price: $12 - $3600</span>
                                </div>
                            </div>

                            <button className="btn-primary w-full mt-6">Book Now</button>
                        </div>

                        <div className="md:w-1/2 flex justify-center">
                            <div className="relative w-full h-80">
                                <Image
                                    src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&h=400&q=80"
                                    alt="Travel essentials"
                                    fill
                                    className="object-cover rounded-lg shadow-lg"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PackagesPage
