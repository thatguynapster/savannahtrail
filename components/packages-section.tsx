import { Star, Users } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import React from 'react'
import clsx from "clsx";

import { getTourPackages } from "@/lib/actions/packages";
import { PLACEHOLDER_IMAGE } from "@/lib/utils";

type Props = {}

const PackagesSection = async (props: Props) => {

    const { responses: { docs: packages } } = await getTourPackages({ limit: 10 })
    console.log('packages:', packages)

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h3 className="section-subtitle">POPULAR</h3>
                    <h2 className="section-title">Our Trending Tour Packages</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map(pkg =>
                        <div key={pkg._id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm card-hover">
                            <div className="relative w-full h-56">
                                <Image
                                    src={pkg.images.length ? pkg.images[0] : PLACEHOLDER_IMAGE}
                                    alt={pkg.title}
                                    fill
                                    className={clsx(
                                        { "object-cover": !!pkg.images.length }
                                    )}
                                />

                                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm py-1 px-3 rounded-full text-sm font-medium">
                                    {pkg.duration_hours} hrs
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-xl font-semibold">{pkg.title}</h3>
                                    {/* <div className="flex items-center">
                                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                        <span className="ml-1 font-medium">{pkg.rating}</span>
                                    </div> */}
                                </div>

                                <div className="flex items-center text-gray-600 mb-5">
                                    <Users className="w-4 h-4 mr-1" />
                                    <span className="text-sm">{pkg.guest_limit}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-xl font-bold text-primary">${pkg.base_price}</span>
                                        <span className="text-gray-500 ml-1">/ person</span>
                                    </div>
                                    <Link href={`/packages/${pkg._id}/book`} className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm transition-colors inline-block">
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default PackagesSection